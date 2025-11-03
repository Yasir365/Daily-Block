import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const query: any = {
      userType: { $ne: "admin" }, // ✅ exclude admins
    };
    if (status !== "all") query.status = status;

    const users = await User.find(query).sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (err: any) {
    console.error("❌ Error fetching users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action"); // "delete" | "restore"

    if (!id || !action) {
      return NextResponse.json(
        { success: false, message: "User ID and action are required." },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    let message = "";
    if (action === "delete") {
      user.isDeleted = true;
      user.deletedAt = new Date();
      message = `User ${user.firstName || user.email} has been soft deleted.`;
    } else if (action === "restore") {
      user.isDeleted = false;
      user.deletedAt = null;
      message = `User ${user.firstName || user.email} has been restored.`;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action. Use 'delete' or 'restore'.",
        },
        { status: 400 }
      );
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: `User ${
        action === "delete" ? "soft deleted" : "restored"
      } successfully.`,
      user,
    });
  } catch (err: any) {
    console.error("❌ User update error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
