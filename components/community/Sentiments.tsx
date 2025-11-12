"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const Sentiments = ({
    selectedCoin,
    setiment,
    isLoading,
}: {
    selectedCoin: { _id: string; coinName: string };
    setiment: any;
    isLoading: boolean;
}) => {

    const [bullishWidth, setBullishWidth] = useState(0);
    const [bearishWidth, setBearishWidth] = useState(0);

    const bullish = setiment?.bullish || 0;
    const bearish = setiment?.bearish || 0;

    // Animate when values update
    useEffect(() => {
        const timeout = setTimeout(() => {
            setBullishWidth(bullish);
            setBearishWidth(bearish);
        }, 100); // short delay for smooth entrance
        return () => clearTimeout(timeout);
    }, [bullish, bearish]);

    return (
        <div className="bg-brand-glass p-4 rounded-2xl border border-gray-800 w-full">
            <h3 className="text-sm font-semibold mb-3">Community Sentiment</h3>

            <div className="flex gap-2 items-center">
                {/* Bullish label */}
                <div className="flex items-center gap-1 text-brand-green">
                    <TrendingUp size={14} /> {bullish}%
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
                    <div
                        className="h-full bg-brand-green transition-all duration-500"
                        style={{ width: `${bullishWidth}%` }}
                    ></div>
                    <div
                        className="h-full bg-brand-red transition-all duration-500"
                        style={{ width: `${bearishWidth}%` }}
                    ></div>
                </div>

                {/* Bearish label */}
                <div className="flex items-center gap-1 text-brand-red">
                    {bearish}% <TrendingDown size={14} />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center gap-2 text-xs text-gray-400 mt-2">
                <button className="text-center py-1 gap-2 border border-brand-green text-brand-green w-full rounded-md flex items-center justify-center">
                    <TrendingUp />
                    Bullish
                </button>
                <button className="text-center py-1 gap-2 border border-brand-red text-brand-red w-full rounded-md flex items-center justify-center">
                    <TrendingDown />
                    Bearish
                </button>
            </div>
        </div>
    );
};

export default Sentiments;
