import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FaqModal from "@/models/FaqModal";

// ✅ Connect to MongoDB
export async function GET() {
  try {
    await connectDB();

    const faqs = await FaqModal.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error("GET FAQ Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// ✅ Create new FAQ
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: "Question and Answer are required" },
        { status: 400 }
      );
    }
    console.log({ question, answer });
    const faq = await FaqModal.create({ question, answer });
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error("POST FAQ Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

// ✅ Soft delete an FAQ by ID
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "FAQ ID is required" },
        { status: 400 }
      );
    }

    const faq = await FaqModal.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    console.error("DELETE FAQ Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
