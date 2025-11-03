import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NotificationModel from "@/models/NotificationModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Force dynamic execution
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ 1. Verify token
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded._id || decoded.userId;
    const userRole = decoded.role; // 👈 get user role from token

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // ✅ 2. Pagination and filters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const unread = searchParams.get("unread") === "true";
    const mode = searchParams.get("mode") || "user"; // 👈 detect admin mode

    const skip = (page - 1) * limit;

    // ✅ 3. Build query (use ObjectId only)
    let filter: any = {
      isDeleted: { $ne: true },
    };
    if (userRole === "admin" && mode === "all") {
      // ✅ Admin can see all forAdmin notifications
      filter = {
        ...filter,
        $or: [
          { forAdmin: true },
          { receiverId: userObjectId }, // in case admin gets direct messages too
        ],
      };
    } else {
      // ✅ Regular user only sees their notifications
      filter.receiverId = userObjectId;
      filter.forAdmin = { $ne: true }; // 👈 exclude admin notifications
    }

    if (unread) filter.isRead = false;

    // ✅ 4. Fetch notifications + counts
    const [notifications, total, unreadCount] = await Promise.all([
      NotificationModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(
          "relatedId",
          "title name status icoEndDate price description slug icon"
        )
        .lean(),
      NotificationModel.countDocuments(filter),
      NotificationModel.countDocuments({ ...filter, isRead: false }),
    ]);

    // ✅ 5. Return response
    return NextResponse.json({
      success: true,
      total,
      unreadCount,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: notifications,
    });
  } catch (err: any) {
    console.error("❌ Notification GET Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // const userId = decoded.userId; // ❌ Not needed if admin marks all

    const { id, markAll } = await req.json();

    if (markAll) {
      // ✅ Mark all notifications as read (admin/global)
      const result = await NotificationModel.updateMany(
        { isRead: false },
        { $set: { isRead: true } }
      );

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read.",
        updated: result.modifiedCount,
      });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Notification ID is required" },
        { status: 400 }
      );
    }

    // ✅ Mark single notification as read (admin/global)

    const notification = await NotificationModel.findOneAndUpdate(
      { _id: id },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (err: any) {
    console.error("Error updating notification:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
