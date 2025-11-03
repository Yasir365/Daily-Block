import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";
import fs from "fs";
import path from "path";
import { verifyToken } from "@/lib/verifyToken";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, message: "Invalid content type." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // 🧩 Collect regular update fields
    const updates: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (
        key !== "image" &&
        key !== "userId" &&
        key !== "password" &&
        key !== "newPassword" &&
        key !== "confirmNewPassword"
      ) {
        updates[key] = value;
      }
    });

    // 🖼️ Handle image upload
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${userId}_${Date.now()}_${file.name}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);

      updates.image = `/uploads/${filename}`;
    }

    // 🔐 Handle optional password change
    const currentPassword = formData.get("password") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (currentPassword && (newPassword || confirmNewPassword)) {
      // ✅ All 3 must be provided
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return NextResponse.json(
          {
            success: false,
            message:
              "To change your password, please fill all password fields.",
          },
          { status: 400 }
        );
      }

      // ✅ Verify existing user and password match
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found." },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Incorrect current password." },
          { status: 400 }
        );
      }

      if (newPassword !== confirmNewPassword) {
        return NextResponse.json(
          { success: false, message: "New passwords do not match." },
          { status: 400 }
        );
      }

      // ✅ Hash and set new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    // 🧠 Perform update
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: Object.keys(updates).includes("password")
        ? "Password updated successfully."
        : "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error("❌ Profile update error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { user: userData, error } = await verifyToken(req);
  try {
    await connectDB();

    // ✅ 1. Extract userId from query params or headers
    const { searchParams } = new URL(req.url);

    if (!userData?._id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // ✅ 2. Fetch user from DB
    const user = await User.findById(userData._id).select("-password"); // exclude password

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // ✅ 3. Return user data
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err: any) {
    console.error("❌ Fetch profile error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
