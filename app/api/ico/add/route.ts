import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import IcoProject from "@/models/Icoproject";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

    const currentUserId = decoded.userId; // 👈 The logged-in user ID
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
    const payload = {
      ...data,
      userId: new mongoose.mongo.ObjectId(currentUserId as string),
      icoIcon: icoIconPath,
      stepCompleted: 1,
      status: data.status || "pending",
    };
    console.log("Payload:", payload);
    const project = new IcoProject(payload);

    await project.save();

    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    console.error("ICO add error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
