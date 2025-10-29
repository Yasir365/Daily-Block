import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import IcoProject from "@/models/Icoproject";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

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

      const folderPath = path.join(process.cwd(), "public", "ico", cryptoCoinName);
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
        return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: updated });
    }

    const project = new IcoProject({
      ...data,
      icoIcon: icoIconPath,
      stepCompleted: 1,
      status: data.status || "pending",
    });

    await project.save();

    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    console.error("ICO add error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
