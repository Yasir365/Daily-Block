import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import path from "path";
import mongoose from "mongoose";
import Post from "@/models/Post";
import Icoproject from "@/models/Icoproject";
import UserModel from "@/models/UserModel";

export async function GET(req: NextRequest, { params }: any) {
  await connectDB();

  const coinId = params?.coin;

  let filter = {};

  // If coinId exists and is a valid ObjectId, filter by coin
  if (
    coinId &&
    coinId !== "undefined" &&
    mongoose.Types.ObjectId.isValid(coinId)
  ) {
    filter = { coin: coinId };
  }
  // ✅ Populate related coin and user info
  const posts = await Post.find(filter)
    .populate({
      path: "coin",
      model: Icoproject, // explicitly specify model to ensure proper binding
      select: "cryptoCoinName coinAbbreviation icoIcon websiteLink", // choose fields
    })
    .populate({
      path: "userId",
      model: UserModel, // explicitly specify model
      select: "firstName lastName image email", // choose fields
    })
    .sort({ createdAt: -1 });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest, { params }: any) {
  try {
    await connectDB();

    const postId = params.coin; // 👈 The post ID from the URL
    const { userId, comment, username } = await req.json();

    if (!userId || !comment || !username) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log({ params });
    // ✅ Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // ✅ If your Post model doesn’t have comments array yet, add it:
    // In your Post model, add this field:
    // comments: [
    //   { userId: { type: Schema.Types.ObjectId, ref: "User" }, username: String, content: String, createdAt: { type: Date, default: Date.now } }
    // ]

    // ✅ Push the comment
    post.comments.push({
      userId,
      username,
      content: comment,
      createdAt: new Date(),
    });

    // ✅ Save the updated post
    await post.save();

    // ✅ Return updated comments
    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      data: post.comments,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
