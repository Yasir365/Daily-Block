import { notification } from "antd";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/BlogModel";
import Notification from "@/models/NotificationModel";
import { verifyToken } from "@/lib/verifyToken";

import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";
import { notifyUsersByType } from "@/lib/notify";
import mongoose from "mongoose";

type IBlogStatus = "draft" | "published" | "archived" | "blocked" | "live";

// --- Utility function to save image ---
async function saveImage(file: File) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");

  // Ensure directory exists
  await fsPromises.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  // Convert Blob to Buffer and save
  const buffer = Buffer.from(await file.arrayBuffer());
  await fsPromises.writeFile(filePath, buffer);

  return `/uploads/blogs/${fileName}`;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim() || "";
    const all = searchParams.get("all") === "true";

    // ✅ Verify user (JWT)
    const { user, error } = await verifyToken(req);
    if (error || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Base filter
    const filter: Record<string, any> = { isDeleted: false };
    // Non-admins can only see their own blogs
    if (user.role !== "admin") {
      filter.userId = user._id;
    }

    // Filter by status if provided (draft/published)
    if (status && status !== "all") {
      filter.status = status;
    }

    // Optional text search in title or excerpt
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    console.log("🧩 Blog Filter:", filter);

    // ✅ Count total documents
    const total = await BlogModel.countDocuments(filter);

    // ✅ Query for blogs
    let query = BlogModel.find(filter).sort({ createdAt: -1 }).lean();

    if (!all) {
      query = query.skip((page - 1) * limit).limit(limit);
    }

    const blogs = await query.exec();

    return NextResponse.json({
      success: true,
      total,
      currentPage: page,
      totalPages: all ? 1 : Math.ceil(total / limit),
      data: blogs,
    });
  } catch (err: any) {
    console.error("❌ Blog GET Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
// POST: create a new blog (admin only)
// In app/api/blogs/route.ts

// --- POST: Create a new blog ---
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Verify user
    const { user, error } = await verifyToken(req);
    if (error || !user)
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in again." },
        { status: 401 }
      );

    if (user.role !== "admin")
      return NextResponse.json(
        { success: false, message: "Access denied. Admins only." },
        { status: 403 }
      );

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const status = (formData.get("status") as string) || "draft";
    const imageFile = formData.get("image") as File | null;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, excerpt, and content are required.",
        },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
    }

    const blog = await BlogModel.create({
      title,
      excerpt,
      content,
      image: imageUrl || null,
      status,
      userId: user._id,
      publishedDate: ["published", "live"].includes(status) ? new Date() : null,
    });

    // after `const blog = await BlogModel.create({...})`
    if (!blog) throw new Error("Failed to create blog.");
    // ✅ Notify all users (non-admins)
    // ✅ Notify all non-admin users
    await notifyUsersByType("user", {
      title: "New Blog Published",
      message: `A new blog titled "${blog.title}" has been published.`,
      type: "blog",
      typeRef: "Blog",
      relatedId: new mongoose.Types.ObjectId(blog._id as string),
      relatedData: {
        title: blog.title,
        excerpt: blog.excerpt,
        image: blog.image,
      },
      userId: new mongoose.Types.ObjectId(user._id),
      status: "success",
    });

    return NextResponse.json({
      success: true,
      message: "✅ Blog created successfully.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog creation error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// --- PATCH: Update blog ---
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  if (!id)
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );

    const blog = await BlogModel.findById(id);
    if (!blog)
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as IBlogStatus;
    const imageFile = formData.get("image") as File | null;

    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (status) {
      blog.status = status;
      if (["published", "live"].includes(status))
        blog.publishedDate = new Date();
    }

    // 🧠 Handle image update
    if (imageFile && imageFile.size > 0) {
      // delete old image if exists
      if (
        blog.image &&
        fs.existsSync(path.join(process.cwd(), "public", blog.image))
      ) {
        await fsPromises.unlink(path.join(process.cwd(), "public", blog.image));
      }
      const newImageUrl = await saveImage(imageFile);
      blog.image = newImageUrl;
    }

    await blog.save();

    if (["published", "live"].includes(status)) {
      // await createNotification({
      //   title: "Blog Published",
      //   message: `The blog "${blog.title}" is now live.`,
      //   type: "blog",
      //   relatedId: new mongoose.Types.ObjectId(blog._id as string),
      //   userId: blog.userId,
      // });
    }

    return NextResponse.json({
      success: true,
      message: "✅ Blog updated successfully.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog update error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE: hard delete a blog (admin only)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog permanently deleted.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog delete error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
