import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Icoproject from "@/models/Icoproject";
import UserModel from "@/models/UserModel";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ Await params (Next.js 15+ requirement)
    const { id } = await context.params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid post ID" },
        { status: 400 }
      );
    }

    // ✅ Find the post by ID and populate all relations
    const post = await Post.findById(id)
      .populate({
        path: "coin",
        model: Icoproject,
        select: "cryptoCoinName coinAbbreviation icoIcon websiteLink",
      })
      .populate({
        path: "userId",
        model: UserModel,
        select: "firstName lastName image email status",
      })
      .populate({
        path: "comments.userId", // populate user details in comments too
        model: UserModel,
        select: "firstName lastName image status",
      })
      .lean();

    // ✅ If post not found
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // ✅ Success response
    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching post details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
