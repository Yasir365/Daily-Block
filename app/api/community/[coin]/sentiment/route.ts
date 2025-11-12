import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import Sentiment from "@/models/Sentiment";
import { analyzeSentimentAndMetrics } from "@/lib/gemini";
import { connectDB } from "@/lib/mongodb";
import Icoproject from "@/models/Icoproject";
import { ObjectId } from "mongodb";
export async function GET(req: NextRequest, { params }: any) {
  await connectDB();
  const { coin: coin } = await params;
  // Use cache if data < 8 hours old
  // const recent = await Sentiment.findOne({
  //   coin,
  //   analyzedAt: { $gte: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  // });
  // if (recent) return NextResponse.json(recent);

  // Otherwise analyze new sentiment + metrics
  const posts = await Post.find({ coin })
    .populate({
      path: "coin",
      model: Icoproject, // model name for coin reference
    })
    .populate({
      path: "userId",
      select: "username email profileImage", // optional: user fields
    })
    .sort({ createdAt: -1 })
    .limit(20);
  const coinDetail = await Icoproject.find({ _id: new ObjectId(coin) });
  const coinData = coinDetail[0];
  const textArr = posts.map((p) => `${p.username}: ${p.content}`);

  const analysis = await analyzeSentimentAndMetrics(
    coinData.cryptoCoinName,
    textArr,
    coinData,
    posts
  );

  const newSentiment = await Sentiment.create({
    coin,
    ...analysis,
    analyzedAt: new Date(),
  });

  return NextResponse.json(newSentiment);
}
