import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Icoproject from "@/models/Icoproject";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status") || "";
    const sortParam = url.searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

    // ------------------------------
    // ✅ Dynamic Sorting
    // ------------------------------
    let sortQuery: any = {};

    switch (sortParam) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "oldest":
        sortQuery = { createdAt: 1 };
        break;
      case "priceHigh":
        sortQuery = { icoTokenPrice: -1 };
        break;
      case "priceLow":
        sortQuery = { icoTokenPrice: 1 };
        break;
      case "nameAZ":
        sortQuery = { cryptoCoinName: 1 };
        break;
      case "nameZA":
        sortQuery = { cryptoCoinName: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    // ------------------------------
    // ✅ Dynamic Filters
    // ------------------------------
    const filter: any = {};
    if (status) filter.status = status;

    // ------------------------------
    // ✅ Fetch data with populate + filter + sorting
    // ------------------------------
    const projects = await Icoproject.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("userId", "_id email username");

    const total = await Icoproject.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        message: "Projects fetched successfully",
        data: projects,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error fetching ICO projects:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
