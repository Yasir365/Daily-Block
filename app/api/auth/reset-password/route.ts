import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import VerificationCode from "@/models/VerificationCode";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UserModel";

export async function POST(req: NextRequest) {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword)
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );

    await connectDB();

    const record = await VerificationCode.findOne({ email, code });
    if (!record)
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );

    if (new Date() > record.expiresAt)
      return NextResponse.json(
        { success: false, message: "Code expired" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hashed });

    await VerificationCode.deleteOne({ email }); // remove used code

    return NextResponse.json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
