// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import BlogModel from "@/models/BlogModel";
import IcoProject from "@/models/Icoproject";
import FaqModal from "@/models/FaqModal";
import Newsletter from "@/models/NewsletterModel";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(req: NextRequest) {
  await connectDB();

  const { user } = await verifyToken(req); // token verification
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim() ?? "";
  const status = searchParams.get("status"); // pending | approved | all

  if (!query) {
    return NextResponse.json(
      { success: false, message: "Query is required" },
      { status: 400 }
    );
  }

  const regex = new RegExp(query, "i");

  try {
    // -----------------------------------------------------------------
    // 1. ROLE = "user" → ONLY ICOs, filtered by status
    // -----------------------------------------------------------------
    if (user?.role === "user") {
      const icoResults = await searchIcosOnly(regex, status);
      const key = getIcoResultKey(status);

      return NextResponse.json({
        success: true,
        results: { [key]: icoResults },
      });
    }

    // -----------------------------------------------------------------
    // 2. ANY OTHER ROLE (admin, etc.) → search ALL collections
    // -----------------------------------------------------------------
    const [users, blogs, icos, faqs, newsletters] = await Promise.all([
      UserModel.find({
        $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
      })
        .limit(5)
        .select("firstName lastName email image"),

      BlogModel.find({
        $or: [{ title: regex }, { excerpt: regex }, { content: regex }],
      })
        .limit(5)
        .select("title excerpt _id"),

      IcoProject.find({
        $or: [{ cryptoCoinName: regex }, { coinAbbreviation: regex }],
      })
        .limit(5)
        .select("cryptoCoinName coinAbbreviation _id status"),

      FaqModal.find({
        $or: [{ question: regex }, { answer: regex }],
      })
        .limit(5)
        .select("question answer _id"),

      Newsletter.find({ email: regex }).limit(5).select("email _id"),
    ]);

    return NextResponse.json({
      success: true,
      results: {
        users,
        blogs,
        "icto-management": icos,
        faqs,
        newsletter: newsletters,
      },
    });
  } catch (err: any) {
    console.error("Search error:", err);
    return NextResponse.json(
      { success: false, message: "Search failed" },
      { status: 500 }
    );
  }
}

/* --------------------------------------------------------------- */
/* Helper: ICO-only search (used for role = "user")                */
/* --------------------------------------------------------------- */
async function searchIcosOnly(regex: RegExp, status: string | null) {
  const baseQuery = {
    $or: [{ cryptoCoinName: regex }, { coinAbbreviation: regex }],
  };

  // Apply status filter only when a concrete value is given
  if (status && status !== "all") {
    Object.assign(baseQuery, { status });
  }

  return IcoProject.find(baseQuery)
    .limit(5)
    .select("cryptoCoinName coinAbbreviation _id status")
    .lean();
}

/* --------------------------------------------------------------- */
/* Helper: result key for ICOs (admin/pending, admin/approved…)   */
/* --------------------------------------------------------------- */
function getIcoResultKey(status: string | null): string {
  if (status === "pending") return "pending";
  if (status === "approved") return "approved";
  return "dashboard"; // includes "all" or no status param
}
