import { NextResponse, NextRequest } from "next/server";
import IcoProject from "@/models/Icoproject";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "verified";

    const response = await IcoProject.find({ status }).sort({ createdAt: -1 });

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
