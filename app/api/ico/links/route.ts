import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import { connectDB } from "@/lib/mongodb";
import Icoproject from "@/models/Icoproject";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Verify JWT user
    const { user, error } = await verifyToken(req);
    if (error || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find latest ICO project for current user
    const project = await Icoproject.findOne({ userId: user._id })
      .select("websiteLink whitepaperLink prototypeLink")
      .sort({ createdAt: -1 });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "No ICO project found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        websiteLink: project.websiteLink,
        whitepaperLink: project.whitepaperLink,
        prototypeLink: project.prototypeLink,
      },
    });
  } catch (error) {
    console.error("Error fetching ICO links:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}
