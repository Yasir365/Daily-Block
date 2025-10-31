import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";
import IcoProject from "@/models/Icoproject";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 🔹 Calculate date ranges
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // =======================
    // 1️⃣ Total Listed ICOs
    // =======================
    const totalListedIcos = await IcoProject.countDocuments();
    const currentMonthIcos = await IcoProject.countDocuments({
      createdAt: { $gte: firstDayThisMonth },
    });
    const lastMonthIcos = await IcoProject.countDocuments({
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth },
    });
    const icoPercentChange = lastMonthIcos
      ? ((currentMonthIcos - lastMonthIcos) / lastMonthIcos) * 100
      : currentMonthIcos > 0
      ? 100
      : 0;

    // =======================
    // 2️⃣ Active Users
    // =======================
    const activeUsers = await User.countDocuments({
      status: "active",
      isDeleted: false,
    });
    const currentMonthActive = await User.countDocuments({
      status: "active",
      isDeleted: false,
      createdAt: { $gte: firstDayThisMonth },
    });
    const lastMonthActive = await User.countDocuments({
      status: "active",
      isDeleted: false,
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth },
    });
    const activePercentChange = lastMonthActive
      ? ((currentMonthActive - lastMonthActive) / lastMonthActive) * 100
      : currentMonthActive > 0
      ? 100
      : 0;

    // =======================
    // 3️⃣ Suspended Users
    // =======================
    const suspendedUsers = await User.countDocuments({
      status: "banned",
      isDeleted: false,
    });
    const currentMonthSuspended = await User.countDocuments({
      status: "banned",
      isDeleted: false,
      createdAt: { $gte: firstDayThisMonth },
    });
    const lastMonthSuspended = await User.countDocuments({
      status: "banned",
      isDeleted: false,
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth },
    });
    const suspendedPercentChange = lastMonthSuspended
      ? ((currentMonthSuspended - lastMonthSuspended) / lastMonthSuspended) *
        100
      : currentMonthSuspended > 0
      ? 100
      : 0;

    // =======================
    // 4️⃣ Approved Projects
    // =======================
    const approvedProjects = await IcoProject.countDocuments({
      status: "approved",
    });
    const currentMonthApproved = await IcoProject.countDocuments({
      status: "approved",
      createdAt: { $gte: firstDayThisMonth },
    });
    const lastMonthApproved = await IcoProject.countDocuments({
      status: "approved",
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth },
    });
    const approvedPercentChange = lastMonthApproved
      ? ((currentMonthApproved - lastMonthApproved) / lastMonthApproved) * 100
      : currentMonthApproved > 0
      ? 100
      : 0;

    // ✅ Response
    return NextResponse.json(
      {
        success: true,
        message: "Dashboard stats fetched successfully",
        data: {
          totalListedIcos: {
            count: totalListedIcos,
            change: icoPercentChange.toFixed(2),
          },
          activeUsers: {
            count: activeUsers,
            change: activePercentChange.toFixed(2),
          },
          suspendedUsers: {
            count: suspendedUsers,
            change: suspendedPercentChange.toFixed(2),
          },
          approvedProjects: {
            count: approvedProjects,
            change: approvedPercentChange.toFixed(2),
          },
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Dashboard Stats Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
