import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/MessageModel";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ icoId: string }> } // 👈 must be Promise now
) {
  try {
    await connectDB();

    // 👇 Await the promise
    const { icoId } = await context.params;

    const messages = await Message.find({ icoId })
      .populate("senderId", "firstName lastName email")
      .sort({ createdAt: 1 }); // oldest → newest

    return NextResponse.json({
      success: true,
      messages,
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
    const messageObj = {
      icoId,
      senderId: senderId || null, // handle guest/admin
      message: message,
      senderRole: session?.user?.role,
    };
    console.log({ messageObj });
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
