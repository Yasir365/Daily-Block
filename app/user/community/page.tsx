"use client";
import CoinCard from "@/components/community/CoinCard";
import CoinDetails from "@/components/community/CoinDetails";
import Header from "@/components/community/Header";
import MarketCap from "@/components/community/MarketCap";
import Sentiments from "@/components/community/Sentiments";
import Post from "@/components/community/Post";
import { CoinCardDetail, MarketWatch } from "@/components/coin-view/CoinViewLeft";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useIcoProjects } from "@/hooks/useIcoProjects";
import { formatDateTime } from "@/lib/helpers";
import UserCommunityDetails from "./UserCommunityDetails";

export default function Page() {

    const { data = [] } = useQuery({
        queryKey: ["communitiesCoin"],
        queryFn: async () => {
            const response = await fetch(`/api/community/coins`);
            if (!response.ok) {
                throw new Error('Failed to fetch communities coins');
            }
            const data = await response.json();
            return data;
        },
    });
    console.log(data.community)
    return (
        <div className="text-white container mx-auto flex flex-col md:flex-row w-full">
            {data.community && (<UserCommunityDetails community={data.community} />)}
        </div>
    );
}