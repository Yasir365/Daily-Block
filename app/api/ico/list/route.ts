import { NextResponse, NextRequest } from "next/server";
import IcoProject from "@/models/Icoproject";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // ✅ 1. Extract token from cookies
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // ✅ 2. Verify token and extract user info
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
    const currentUserId = decoded.userId;
    const currentUserRole = decoded.role || "user"; // 👈 ensure you include role in JWT at login

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const interest = searchParams.get("interest");
    const raiseMin = parseFloat(searchParams.get("raiseMin") || "0");
    const raiseMax = parseFloat(searchParams.get("raiseMax") || "0");

    let query: {
      status?: string;
      userId?: mongoose.Types.ObjectId;
      interest?: string;
      raiseAmount?: any;
    } = {};
    if (status && status !== "all") query.status = status;

    if (currentUserRole === "user") {
      query.userId = new mongoose.Types.ObjectId(currentUserId);
    }

    if (interest && interest !== "all") query.interest = interest;
    if (raiseMax > 0) query.raiseAmount = { $gte: raiseMin, $lte: raiseMax };

    const response = await IcoProject.aggregate([
      { $match: query },

      // Include full user info
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },

      // Lookup unread messages count
      {
        $lookup: {
          from: "messages",
          let: { icoId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$icoId", "$$icoId"] } } },
            { $match: { isRead: false } },
            { $count: "unreadCount" },
          ],
          as: "unreadMessages",
        },
      },

      // Add unreadMessageCount field
      {
        $addFields: {
          unreadMessageCount: {
            $ifNull: [{ $arrayElemAt: ["$unreadMessages.unreadCount", 0] }, 0],
          },

          // Actual total raised percentage (can be >100%)
          totalRaisedPercentageActual: {
            $cond: [
              { $eq: ["$fundraisingGoal", 0] },
              0,
              {
                $multiply: [
                  {
                    $divide: [
                      { $toDouble: "$soldOnPreSale" },
                      { $toDouble: "$fundraisingGoal" },
                    ],
                  },
                  100,
                ],
              },
            ],
          },

          // Capped value for progress bar (0-100%)
          totalRaisedPercentageForBar: {
            $cond: [
              { $eq: ["$fundraisingGoal", 0] },
              0,
              {
                $min: [
                  100,
                  {
                    $multiply: [
                      {
                        $divide: [
                          { $toDouble: "$soldOnPreSale" },
                          { $toDouble: "$fundraisingGoal" },
                        ],
                      },
                      100,
                    ],
                  },
                ],
              },
            ],
          },
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json(
      { success: true, message: "Successfully fetched", data: response },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error fetching ICOs:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE ICO PROJECT
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const currentUserRole = decoded.role || "user";
    const currentUserId = decoded.userId;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { success: false, message: "Project ID required" },
        { status: 400 }
      );

    const project = await IcoProject.findById(id);
    if (!project)
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );

    if (
      currentUserRole !== "admin" &&
      project.userId.toString() !== currentUserId
    )
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );

    await IcoProject.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
