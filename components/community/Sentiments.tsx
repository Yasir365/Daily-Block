import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";


const Sentiments = ({ selectedCoin }: { selectedCoin: { _id: string; coinName: string } }) => {
    // console.log({ selectedCoin })
    // const { data: sentiment } = useQuery({
    //     queryKey: ["sentiment", selectedCoin],
    //     queryFn: async () => {
    //         const response = await fetch(`/api/community/${selectedCoin}/sentiment`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch sentiment');
    //         }
    //         const data = await response.json();
    //         return data;
    //     },
    //     staleTime: 1000 * 60 * 60 * 8, // 8 hours cache
    // });
    return (
        <div className="bg-brand-glass p-4 rounded-2xl border border-gray-800 w-full">
            <h3 className="text-sm font-semibold mb-3">Community Sentiment</h3>

            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1 text-brand-green">
                    <TrendingUp size={16} /> 80%
                </div>
                {/* --- Dual-Color Sentiment Bar --- */}
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    {/* Bullish (Green) portion */}
                    <div className="absolute left-0 top-0 h-full bg-brand-green" style={{ width: "80%" }}></div>

                    {/* Bearish (Red) portion */}
                    <div className="absolute right-0 top-0 h-full bg-brand-red" style={{ width: "20%" }}></div>
                </div>
                <div className="flex items-center gap-1 text-brand-red">
                    20% <TrendingDown size={16} />
                </div>
            </div>





            <div className="flex justify-between items-center gap-2 text-xs text-gray-400 mt-2">
                <button className="text-center py-1  gap-2 border border-brand-green text-brand-green w-[100%] rounded-md flex items-center justify-center">
                    <TrendingUp />
                    Bullish</button>
                <button className="text-center py-1  gap-2 border border-brand-red text-brand-red w-[100%] rounded-md flex items-center justify-center">
                    <TrendingDown />
                    Bearish</button>
            </div>
        </div>
    );
};

export default Sentiments;
