import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/MessageModel";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ icoId: string }> }
) {
  try {
    await connectDB();
    const { icoId } = await context.params;

    // ✅ 1️⃣ Pehle unread messages fetch karo (oldest first)
    const unreadMessages = await Message.find({ icoId, isRead: false })
      .populate("senderId", "firstName lastName email")
      .sort({ createdAt: 1 });

    // ✅ 2️⃣ Phir read messages fetch karo (oldest first)
    const readMessages = await Message.find({ icoId, isRead: true })
      .populate("senderId", "firstName lastName email")
      .sort({ createdAt: 1 });

    // ✅ 3️⃣ Dono ko merge karo (unread pehle, phir read)
    const allMessages = [...unreadMessages, ...readMessages];

    // ✅ 4️⃣ Unread messages ko DB me read mark karo (background update)
    if (unreadMessages.length > 0) {
      await Message.updateMany(
        { icoId, isRead: false },
        { $set: { isRead: true } }
      );
    }

    return NextResponse.json({
      success: true,
      messages: allMessages,
    });
  } catch (err: any) {
    console.error("❌ Fetch messages error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ✅ Send (create) a new message
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ icoId: string }> }
) {
  try {
    await connectDB();

    const { icoId } = await context.params;
    const body = await req.json();
    const { message } = body;

    if (!message || !icoId) {
      return NextResponse.json(
        { success: false, error: "Missing message or icoId" },
        { status: 400 }
      );
    }

    // ✅ Optional: get logged-in user (if using NextAuth)
    const session = await verifyToken(req);
    const senderId = session?.user?._id; // or user.id depending on your session shape
    const senderRole = session?.user?.role;
    const messageObj = {
      icoId,
      senderId: senderId || null, // handle guest/admin
      message: message,
      senderRole,
      isRead: senderRole === "admin", // admin messages are auto-read
      readAt: senderRole === "admin" ? new Date() : null,
    };
    const newMessage = await Message.create(messageObj);

    // populate sender info for instant UI updates
    const populatedMsg = await newMessage.populate(
      "senderId",
      "firstName lastName email role"
    );

    return NextResponse.json({ success: true, message: populatedMsg });
  } catch (err: any) {
    console.error("❌ Send message error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
