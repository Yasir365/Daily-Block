import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";

// ✅ PATCH: Update user info
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { _id, firstName, lastName, email, userType, status } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // ✅ Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(userType && { userType }),
        ...(status && { status }),
      },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error("❌ Error updating user:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
