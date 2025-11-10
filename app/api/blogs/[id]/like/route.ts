import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/models/BlogModel";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const { userId, userRole } = await req.json();

    // ❌ 1. Check missing user
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User must be logged in to like" },
        { status: 401 }
      );
    }

    // ❌ 2. Validate if user actually exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid user account" },
        { status: 401 }
      );
    }

    // 3. Get blog
    const blog = await BlogModel.findById(id);
    if (!blog)
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );

    // ❌ 4. Prevent author or admin from liking
    if (blog.userId.toString() === userId || userRole === "admin") {
      return NextResponse.json({
        success: false,
        message: "Authors or admins cannot like their own blog",
      });
    }
    // ✅ 5. Like toggle logic
    if (!Array.isArray(blog.likes)) blog.likes = [];

    const alreadyLiked = blog.likes.some(
      (u: mongoose.Types.ObjectId) => u.toString() === userId
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (u: mongoose.Types.ObjectId) => u.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return NextResponse.json({
      success: true,
      data: {
        liked: !alreadyLiked,
        totalLikes: blog.likes.length,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
