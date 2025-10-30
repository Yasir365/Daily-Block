import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/MessageModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, message: "userId and role are required." },
        { status: 400 }
      );
    }

    const count = await Message.countDocuments({
      receiverId: userId,
      senderRole: role === "admin" ? "user" : "admin",
      isRead: false,
    });

    return NextResponse.json({
      success: true,
      unreadCount: count,
    });
  } catch (err: any) {
    console.error("❌ Unread count error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
