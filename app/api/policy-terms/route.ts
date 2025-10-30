import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PolicyTerm from "@/models/PolicyTermModel";

// ✅ GET (Fetch one or all)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "privacy" | "terms"

    let query: any = {};
    if (type) query.type = type;

    const policies = await PolicyTerm.find(query).sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: policies });
  } catch (err: any) {
    console.error("❌ Error fetching policy:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ✅ POST (Create)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { type, content, userId } = body;

    if (!type || !content)
      return NextResponse.json(
        { success: false, message: "Type and content are required." },
        { status: 400 }
      );

    // prevent duplicates
    const existing = await PolicyTerm.findOne({ type });
    if (existing)
      return NextResponse.json(
        {
          success: false,
          message: "This policy already exists. Use PATCH to update.",
        },
        { status: 400 }
      );

    const newPolicy = await PolicyTerm.create({
      type,
      content,
      lastUpdatedBy: userId,
    });
    return NextResponse.json({ success: true, data: newPolicy });
  } catch (err: any) {
    console.error("❌ Policy create error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ✅ PATCH (Update)
// ✅ PATCH (Update or Create if not exist)
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { type, content, userId } = body;

    if (!type || !content)
      return NextResponse.json(
        { success: false, message: "Type and content are required." },
        { status: 400 }
      );

    const updatedPolicy = await PolicyTerm.findOneAndUpdate(
      { type },
      {
        $set: { content, lastUpdatedBy: userId },
        $setOnInsert: { createdAt: new Date() }, // only when new
      },
      { new: true, upsert: true } // ✅ create if not found
    );

    return NextResponse.json({
      success: true,
      message: "Policy updated or created successfully.",
      data: updatedPolicy,
    });
  } catch (err: any) {
    console.error("❌ Policy upsert error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
