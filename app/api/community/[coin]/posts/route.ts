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

  const { coin: coinId } = await params;

  let filter: any = {};
  if (
    coinId &&
    coinId !== "undefined" &&
    mongoose.Types.ObjectId.isValid(coinId)
  ) {
    filter = { coin: coinId };
  }

  // Get sort query parameter (default: latest)
  const url = new URL(req.url);
  const sortParam = url.searchParams.get("sort") || "latest";

  let posts = await Post.find(filter)
    .populate({
      path: "coin",
      model: Icoproject,
      // select: "cryptoCoinName coinAbbreviation icoIcon websiteLink",
    })
    .populate({
      path: "userId",
      model: UserModel,
      select: "firstName lastName image email",
    });

  if (sortParam === "latest") {
    // Sort by creation date descending
    posts = posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (sortParam === "top") {
    // Sort by popularity (likes + shares + reposts + comments)
    posts = posts.sort((a, b) => {
      const scoreA =
        (a.likes?.length || 0) +
        (a.shares?.length || 0) +
        (a.reposts?.length || 0) +
        (a.comments?.length || 0);

      const scoreB =
        (b.likes?.length || 0) +
        (b.shares?.length || 0) +
        (b.reposts?.length || 0) +
        (b.comments?.length || 0);

      return scoreB - scoreA; // descending
    });
  }

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest, { params }: any) {
  try {
    await connectDB();
    const formData = await req.formData();

    const userIdStr = formData.get("userId")?.toString() ?? "";
    const coinStr = formData.get("coin")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";

    if (!mongoose.Types.ObjectId.isValid(coinStr))
      throw new Error("Invalid coin ObjectId");

    if (!mongoose.Types.ObjectId.isValid(userIdStr))
      throw new Error("Invalid userId ObjectId");

    const imageFiles = formData.getAll("images") as File[];
    let imageUrls: string[] = [];

    if (imageFiles && imageFiles.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads/posts");
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });

      for (const file of imageFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, file.name);
        fs.writeFileSync(filePath, buffer);
        imageUrls.push(`/uploads/posts/${file.name}`);
      }
    }

    const obj = {
      coin: new mongoose.Types.ObjectId(coinStr),
      userId: new mongoose.Types.ObjectId(userIdStr),
      username,
      content,
      images: imageUrls,
    };

    const post = await Post.create(obj);

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
