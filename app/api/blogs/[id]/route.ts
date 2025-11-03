import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/BlogModel";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 updated type
) {
  try {
    const { id } = await context.params; // 👈 await the params
    await connectDB();

    const blog = await BlogModel.findById(id).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
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
