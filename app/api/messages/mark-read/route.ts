import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/MessageModel";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { icoId, userId, role } = await req.json();

    if (!icoId || !userId || !role) {
      return NextResponse.json(
        { success: false, message: "icoId, userId, and role are required." },
        { status: 400 }
      );
    }

    // ✅ Mark all messages *received by* this user/admin as read
    const result = await Message.updateMany(
      {
        icoId,
        senderRole: role === "admin" ? "user" : "admin", // mark opposite side’s messages
        receiverId: userId,
        isRead: false,
      },
      {
        $set: { isRead: true, readAt: new Date() },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Messages marked as read.",
      updatedCount: result.modifiedCount,
    });
  } catch (err: any) {
    console.error("❌ Mark read error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
