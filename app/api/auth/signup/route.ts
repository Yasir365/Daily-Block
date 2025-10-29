import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { firstName, lastName, email, password, userType } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
