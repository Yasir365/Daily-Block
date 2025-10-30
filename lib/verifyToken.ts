// utils/verifyToken.ts
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/UserModel";
import { connectDB } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export interface AuthUser {
  _id: string;
  email: string;
  role: string;
}

export async function verifyToken(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Extract token from cookies or headers
    const token =
      req.cookies.get("auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return { user: null, error: "No authentication token provided" };
    }

    // ✅ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & AuthUser;

    if (!decoded || !decoded.userId) {
      return { user: null, error: "Invalid or malformed token" };
    }

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.userId).select(
      "_id firstName lastName email userType status"
    );

    if (!user) {
      return { user: null, error: "User not found" };
    }

    return {
      user: {
        _id: user?._id?.toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.userType,
        status: user.status,
      },
      error: null,
    };
  } catch (err: any) {
    console.error("❌ verifyToken error:", err.message);
    return { user: null, error: "Unauthorized or expired token" };
  }
}
