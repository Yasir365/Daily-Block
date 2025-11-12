import { NextRequest, NextResponse } from "next/server";
import IcoProject from "@/models/Icoproject";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export const dynamic = "force-dynamic"; // optional if you want dynamic response

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const coinId = id; // ✅ Get coin id from query

    if (!coinId) {
      return NextResponse.json(
        { success: false, message: "Coin ID is required" },
        { status: 400 }
      );
    }

    // ✅ Find ICO project by _id
    const icoProject = await IcoProject.findById(coinId).lean();

    if (!icoProject) {
      return NextResponse.json(
        { success: false, message: "ICO project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: icoProject },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error fetching ICO project:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
