import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const TOKEN_EXPIRY = "7d";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Email isn't registered" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.userType,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const lastLogin = existingUser.lastLogin;
    // Or using findByIdAndUpdate
    await User.findByIdAndUpdate(existingUser._id, { lastLogin: new Date() });

    const userResponse = {
      _id: existingUser._id,
      name: existingUser.firstName + " " + existingUser.lastName,
      email: existingUser.email,
      type: existingUser.userType,
      status: existingUser.status,
      hasCommunity: existingUser?.hasCommunity || false,
      createdAt: existingUser.createdAt,
      lastLogin: lastLogin, // ✅ send to frontend if needed
    };

    const response = NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
        user: userResponse,
        token,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
