// /app/api/dashboard/stats/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/UserModel";
import IcoProject from "@/models/Icoproject";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "weekly"; // "weekly" | "monthly"

    // 🧮 Basic Counts
    const [
      totalUsers,
      activeUsers,
      totalProjects,
      draftProjects,
      pendingProjects,
      approvedProjects,
      rejectedProjects,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ status: "active" }),
      IcoProject.countDocuments({}),
      IcoProject.countDocuments({ status: "draft" }),
      IcoProject.countDocuments({ status: "pending" }),
      IcoProject.countDocuments({ status: "approved" }),
      IcoProject.countDocuments({ status: "rejected" }),
    ]);

    // 📊 Growth Data
    const days = mode === "weekly" ? 7 : 30;
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    // ✅ Aggregate new users and projects by day
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sinceDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const projectGrowth = await IcoProject.aggregate([
      { $match: { createdAt: { $gte: sinceDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🧠 Format growth data for chart
    const formattedGrowth = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(sinceDate);
      date.setDate(sinceDate.getDate() + i);
      const key = date.toISOString().split("T")[0];

      const users = userGrowth.find((d) => d._id === key)?.count || 0;
      const projects = projectGrowth.find((d) => d._id === key)?.count || 0;

      formattedGrowth.push({
        day: key,
        users,
        projects,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          users: {
            total: totalUsers,
            active: activeUsers,
            inactive: totalUsers - activeUsers,
          },
          icoProjects: {
            total: totalProjects,
            draft: draftProjects,
            pending: pendingProjects,
            approved: approvedProjects,
            rejected: rejectedProjects,
          },
        },
        growth: formattedGrowth,
      },
    });
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
