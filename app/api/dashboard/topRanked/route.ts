import { NextResponse } from "next/server";

const COINRANKING_API = "https://api.coinranking.com/v2/coins/trending";

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

    const coins = result?.data?.coins?.map((coin: any) => ({
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

    console.log("Response:", coins?.length || 0);
    return NextResponse.json({ status: "success", coins }, { status: 200 });
  } catch (err) {
    console.error("Failed to load top ranked coins", err);
    return NextResponse.json(
      { error: "Failed to load top ranked coins" },
      { status: 500 }
    );
  }
}