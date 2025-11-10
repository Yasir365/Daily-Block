import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import IcoProject from "@/models/Icoproject";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import NotificationModel from "@/models/NotificationModel";
import { notifyUsersByType } from "@/lib/notify";
import CommunityModel from "@/models/CommunityModel";
import UserModel from "@/models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Extract and verify JWT token from cookies
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. No token provided." },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const currentUserId = decoded.userId; // 👈 Logged-in user ID
    const formData = await req.formData();
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (value instanceof File) {
        data[key] = value;
      } else {
        try {
          data[key] = JSON.parse(value as string);
        } catch {
          data[key] = value;
        }
      }
    });

    const { _id, cryptoCoinName } = data;

    // ✅ Handle FAQs
    if (typeof data.faqs === "string") {
      try {
        data.faqs = JSON.parse(data.faqs);
      } catch {
        data.faqs = [];
      }
    }

    if (data.faqs && !Array.isArray(data.faqs)) {
      data.faqs = [data.faqs];
    }

    // ✅ Handle icon upload
    let icoIconPath: string | undefined;
    const icoIcon = data.icoIcon as File | undefined;
    if (icoIcon) {
      const bytes = await icoIcon.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const folderPath = path.join(
        process.cwd(),
        "public",
        "ico",
        cryptoCoinName
      );
      fs.mkdirSync(folderPath, { recursive: true });

      const fileName = icoIcon.name.replace(/\s+/g, "_");
      const filePath = path.join(folderPath, fileName);
      fs.writeFileSync(filePath, buffer);

      icoIconPath = `/ico/${cryptoCoinName}/${fileName}`;
    }

    // ✅ Update existing ICO
    if (_id) {
      const updateFields: Record<string, any> = { ...data };
      if (icoIconPath) updateFields.icoIcon = icoIconPath;

      const updated = await IcoProject.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, message: "Not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: updated });
    }

    // ✅ Create new ICO
    const payload = {
      ...data,
      userId: new mongoose.mongo.ObjectId(currentUserId as string),
      icoIcon: icoIconPath,
      stepCompleted: 1,
      status: data.status || "pending",
    };

    const project = await IcoProject.create(payload);

    // ✅ Check if community already exists for this user
    let community = await CommunityModel.findOne({ userId: currentUserId });

    if (community) {
      // ✅ Add new ICO to existing community
      community.icoProjects.push(project._id);
      await community.save();
    } else {
      // ✅ Create new community for this user
      const communityImage = icoIconPath || "/default-community.png";
      const communityName = `${cryptoCoinName} Community`;

      community = await CommunityModel.create({
        userId: currentUserId,
        name: communityName,
        image: communityImage,
        icoProjects: [project._id],
      });
    }

    // ✅ Mark user as having a community
    await UserModel.findByIdAndUpdate(currentUserId, { hasCommunity: true });
    // ✅ Create admin notification
    // await NotificationModel.create({
    //   title: "New ICO Project Submitted",
    //   message: `A new coin "${cryptoCoinName}" has been added and is waiting for approval.`,
    //   type: "ico",
    //   relatedId: project._id,
    //   forAdmin: true, // optional: mark it as admin-only
    //   status: "pending",
    //   createdAt: new Date(),
    // });
    // ✅ Notify admin about new ICO
    await notifyUsersByType("admin", {
      title: "New ICO Project Submitted",
      message: `A new coin "${cryptoCoinName}" has been added and is waiting for approval.`,
      type: "ico",
      relatedId: project._id,
      forAdmin: true,
      status: "pending",
    });

    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    console.error("ICO add error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
