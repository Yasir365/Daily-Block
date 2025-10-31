// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/NewsletterModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email)
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );

    // Check if already exists
    const existing = await Newsletter.findOne({ email });
    if (existing)
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 400 }
      );

    const newSubscriber = await Newsletter.create({ email });
    return NextResponse.json({ success: true, data: newSubscriber });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    if (!id || !["active", "blocked"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    const updated = await Newsletter.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
