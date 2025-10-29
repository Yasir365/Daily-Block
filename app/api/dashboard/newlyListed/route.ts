import { NextResponse } from "next/server";
const COINRANKING_API = "https://api.coinranking.com/v2/coins?tiers[]=1";
const COINRANKING_API_KEY = process.env.COINRANKING_API_KEY;

export async function GET() {
    try{
        const res = await fetch(COINRANKING_API, {
            headers: {
                'Content-Type' : "application/json",
            },
            cache: "no-store"
        });
        if(!res.ok)throw new Error("Failed to fetch coins");

        const data = await res.json();

        const sorted = data.data.coins
        .filter((coin: any) => coin.listedAt)
        .sort((a: any, b: any) => b.listedAt - a.listedAt)
        .slice(0, 10)
        .map((coin: any) => ({
            name: coin.name,
            symbol: coin.symbol,
            iconUrl: coin.iconUrl,
            listedAt: coin.listedAt,
            price: coin.price,
        }));

        return NextResponse.json({ coins : sorted }, { status: 200 });

    }catch(err){
        console.error(err)
        return NextResponse.json({error : "Failed to laod coins"}, { status : 500 })
    }
}