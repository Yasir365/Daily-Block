import { NextRequest, NextResponse } from "next/server";
import VerificationCode from "@/models/VerificationCode";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, otp: code } = await req.json();
    if (!email || !code)
      return NextResponse.json(
        { success: false, message: "Email and code are required" },
        { status: 400 }
      );

    await connectDB();

    const record = await VerificationCode.findOne({ email, code });
    if (!record)
      return NextResponse.json(
        { success: false, message: "Invalid code" },
        { status: 400 }
      );

    if (new Date() > record.expiresAt)
      return NextResponse.json(
        { success: false, message: "Code expired" },
        { status: 400 }
      );

    return NextResponse.json({
      success: true,
      message: "Code verified successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
