import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Community from "@/models/CommunityModel";
import Icoproject from "@/models/Icoproject";
import { verifyToken } from "@/lib/verifyToken";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Get current logged-in user from JWT
    const { user } = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    // ✅ Fetch single community owned by this user
    const community = await Community.findOne({ userId: user._id })
      .populate({
        path: "icoProjects",
        model: Icoproject,
      })
      .lean();

    if (!community) {
      return NextResponse.json(
        { message: "No community found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ community }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching user community:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// 🟠 PUT — update community (name, image, etc.)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { user } = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    // 🧾 Parse FormData
    const formData = await req.formData();
    const _id = formData.get("_id") as string;
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File | null;

    if (!_id) {
      return NextResponse.json(
        { message: "Community ID is required" },
        { status: 400 }
      );
    }

    const community = await Community.findOne({ _id, userId: user._id });
    if (!community) {
      return NextResponse.json(
        { message: "Community not found" },
        { status: 404 }
      );
    }

    // 🖼️ Handle Image Upload (optional)
    let imagePath = community.image; // keep old image if none uploaded

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if missing
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "community"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, filename);

      // Write image file
      await fs.promises.writeFile(filePath, buffer);

      // Save relative path for DB
      imagePath = `/uploads/community/${filename}`;
    }

    // 📝 Update community
    community.name = name || community.name;
    community.image = imagePath;

    await community.save();

    return NextResponse.json(
      { message: "Community updated successfully", community },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error updating community:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
