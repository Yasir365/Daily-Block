import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import IcoProject from "@/models/Icoproject";
import jwt from "jsonwebtoken";
import { createNotification, notifyUsersByType } from "@/lib/notify";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    // ✅ 1. Verify Token
    const token = req.cookies.get("auth_token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ✅ 2. Check admin role
    const currentUserRole = decoded.role;
    if (currentUserRole !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only admins can approve/reject ICOs",
        },
        { status: 403 }
      );
    }

    // ✅ 3. Extract body data
    const { id, action } = await req.json();
    if (!id || !["approved", "rejected"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request: Provide valid ID and action (approved/rejected)",
        },
        { status: 400 }
      );
    }

    // ✅ 4. Find and update project
    const project = await IcoProject.findById(id);
    if (!project)
      return NextResponse.json(
        { success: false, message: "ICO Project not found" },
        { status: 404 }
      );

    project.status = action;
    await project.save();

    // await createNotification({
    //   title: "ICO Updated",
    //   message:
    //     action === "approved"
    //       ? `Your ICO "${project.cryptoCoinName}" has been approved.`
    //       : `Your ICO "${project.cryptoCoinName}" has been rejected.`,
    //   type: "ico",
    //   relatedId: new mongoose.Types.ObjectId(project._id),
    //   userId: new mongoose.Types.ObjectId(project.userId),
    // });
    await createNotification({
      title: "ICO Status Updated",
      message:
        action === "approved"
          ? `Your ICO "${project.cryptoCoinName}" has been approved.`
          : `Your ICO "${project.cryptoCoinName}" has been rejected.`,
      type: "ico",
      relatedId: new mongoose.Types.ObjectId(project._id),
      userId: new mongoose.Types.ObjectId(project.userId), // 👈 related user
      status: action === "approved" ? "success" : "error",
    });
    await notifyUsersByType("user", {
      title: "ICO Reviewed",
      message: `ICO "${project.cryptoCoinName}" was ${action} by an admin.`,
      type: "ico",
      relatedId: new mongoose.Types.ObjectId(project._id),
      status: "info",
    });
    return NextResponse.json(
      {
        success: true,
        message: `Project has been ${action} successfully.`,
        data: project,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error approving/rejecting ICO:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
