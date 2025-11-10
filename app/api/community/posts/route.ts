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
      select: "firstName lastName image email status", // choose fields
    })
    .sort({ createdAt: -1 });

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
