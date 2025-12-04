import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Icoproject from "@/models/Icoproject";

const COINRANKING_API = "https://api.coinranking.com/v2/coins/trending";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     // ✅ Extract token
//     const token = req.cookies.get("auth_token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     // ✅ Verify token
//     let decoded: any;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//       return NextResponse.json(
//         { success: false, message: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }

//     const currentUserId = decoded.userId;

//     // ✅ Pagination params
//     const url = new URL(req.url);
//     const page = parseInt(url.searchParams.get("page") || "1"); // default page 1
//     const limit = parseInt(url.searchParams.get("limit") || "10"); // default 10
//     const skip = (page - 1) * limit;

//     // ✅ Fetch projects with user info
//     const projects = await Icoproject.find({}) // Add your filters instead of {}
//       .sort({ createdAt: -1 }) // newest first
//       .skip(skip)
//       .limit(limit)
//       .populate("userId", "_id email username"); // fetch user info

//     // ✅ Add unreadMessages count for each project
//     // const projectsWithUnread = await Promise.all(
//     //   projects.map(async (proj) => {
//     //     const unreadCount = await Message.countDocuments({
//     //       icoId: proj._id,
//     //       isRead: false,
//     //     });

//     //     return {
//     //       ...proj.toObject(),
//     //       unreadMessageCount: unreadCount,
//     //     };
//     //   })
//     // );

//     // ✅ Total count for pagination
//     const total = await Icoproject.countDocuments({});

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Projects fetched successfully",
//         data: projects,
//         pagination: {
//           total,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit),
//         },
//       },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("Error fetching ICO projects:", err);
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    const response = await fetch(COINRANKING_API, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`CoinRanking API error: ${response.status}`);
    }

    const result = await response.json();
    const coinsArray = Array.isArray(result?.data?.coins)
      ? result.data.coins
      : [];

    const coins = coinsArray?.map((coin: any) => ({
      uuid: coin.uuid,
      name: coin.name,
      symbol: coin.symbol,
      iconUrl: coin.iconUrl,
      price: coin.price,
      marketCap: coin.marketCap,
      change: coin.change,
      rank: coin.rank,
      listedAt: coin.listedAt,
      volume24h: coin["24hVolume"],
      coinUrl: coin.coinrankingUrl,
      networks: coin.contractAddresses || [],
    }));

    return NextResponse.json({ status: "success", coins }, { status: 200 });
  } catch (err) {
    console.error("Failed to load top ranked coins", err);
    return NextResponse.json(
      { error: "Failed to load top ranked coins" },
      { status: 500 }
    );
  }
}
