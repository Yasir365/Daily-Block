import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/MessageModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { icoId, senderId, senderRole, message, receiverId } =
      await req.json();

    if (!icoId || !senderId || !senderRole || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      icoId,
      senderId,
      senderRole,
      message,
      receiverId: receiverId || null,
      isRead: false, // 👈 unread initially
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (err: any) {
    console.error("❌ Message send error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
