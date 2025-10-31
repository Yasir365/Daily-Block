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
    // ✅ 1. Connect to DB
    await connectDB();

    // ✅ 2. Verify JWT
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded._id || decoded.userId || "69036898dd4fa5a695fc73ad"; // 👈 fallback for testing

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // ✅ 3. Extract query params
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const mode = searchParams.get("mode") || "limited";
    const type = searchParams.get("type");
    const unread = searchParams.get("unread");

    // ✅ 4. Build query filter
    // const filter: any = {
    //   $or: [{ userId: userObjectId }, { receiverId: userObjectId }],
    // };
    console.log({ userId });
    // const filter: any = {
    //   $or: [
    //     { userId: new mongoose.Types.ObjectId("69036c54dd4fa5a695fc7454") },
    //     { receiverId: new mongoose.Types.ObjectId("69036c54dd4fa5a695fc7454") },
    //   ],
    // };

    const filter: any = {};
    if (type) filter.type = type;
    if (unread === "true") filter.isRead = false;

    // ✅ 5. Query setup
    const baseQuery = NotificationModel.find(filter)
      .sort({ createdAt: -1 })
      .populate({
        path: "relatedId",
        select: "title name status icoEndDate price description slug icon",
      });

    // ✅ 6. Mode = all → fetch all notifications
    if (mode === "all") {
      const [allNotifications, unreadCount] = await Promise.all([
        baseQuery.lean(),
        NotificationModel.countDocuments({
          $or: [{ userId: userObjectId }, { receiverId: userObjectId }],
          isRead: false,
        }),
      ]);

      return NextResponse.json({
        success: true,
        mode: "all",
        total: allNotifications.length,
        unreadCount,
        data: allNotifications,
      });
    }

    // ✅ 7. Paginated (default)
    const skip = (page - 1) * limit;
    const [notifications, total, unreadCount] = await Promise.all([
      baseQuery.skip(skip).limit(limit).lean(),
      NotificationModel.countDocuments(filter),
      NotificationModel.countDocuments({
        $or: [{ userId: userObjectId }, { receiverId: userObjectId }],
        isRead: false,
      }),
    ]);

    return NextResponse.json({
      success: true,
      mode,
      total,
      unreadCount,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: notifications,
    });
  } catch (err: any) {
    console.error("❌ Error fetching notifications:", err);
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
