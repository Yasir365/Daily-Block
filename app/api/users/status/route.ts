import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";

export async function PATCH(req: NextRequest) {
  try {
    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Parse request body
    const { id, action } = await req.json();

    // ✅ Validate
    if (!id || !["active", "suspended"].includes(action)) {
      return NextResponse.json(
        { success: false, message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    // ✅ Find user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Update user status
    user.status = action;
    await user.save();

    return NextResponse.json({
      success: true,
      message: `User ${
        action === "active" ? "activated" : "suspended"
      } successfully`,
      user,
    });
  } catch (error: any) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
