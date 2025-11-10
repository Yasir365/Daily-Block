import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/BlogModel";
import mongoose from "mongoose";
import UserModel from "@/models/UserModel"; // ✅ Make sure you have this

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    // Get user info from request headers (or session)
    // Example: `x-user-id` and `x-user-role` headers sent from frontend
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role"); // "admin" or "user"

    // ✅ Populate both publisher and comment authors
    const blog = await BlogModel.findById(id)
      .populate({
        path: "userId",
        select: "firstName lastName email image userType",
      })
      .populate({
        path: "comments.userId",
        select: "firstName lastName email image",
      })
      .lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Only increment views if:
    // 1. The blog is published
    // 2. The viewer is not the author
    // 3. The viewer is not an admin
    if (
      blog.status === "published" &&
      blog.userId.toString() !== userId &&
      userRole !== "admin" &&
      userRole !== "guest"
    ) {
      await BlogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
      // Optionally update the local object too
      blog.views += 1;
    }
    return NextResponse.json({
      success: true,
      data: {
        ...blog,
        publisher: blog.userId, // rename for frontend clarity
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ✅ Add new comment
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { userId, comment } = body;

    if (!userId || !comment) {
      return NextResponse.json(
        { success: false, message: "userId and comment are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // ✅ Add the comment
    blog.comments.push({
      userId: new mongoose.Types.ObjectId(userId),
      comment,
      createdAt: new Date(),
    });

    await blog.save();

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      data: blog.comments[blog.comments.length - 1], // Return last added comment
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
