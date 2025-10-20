import React from "react";

const MarketCap = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-yellow/10 py-2 px-4 rounded-xl border border-brand-yellow/20">
            <h3 className="text-sm text-brand-muted font-semibold mb-0">Profile Score</h3>
            <div className="flex items-center justify-end gap-1">

                <div className="w-2/3 h-2 bg-gray-800 rounded-full">
                    <div className="w-[76%] bg-yellow-500 h-full rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-yellow-500">76%</span>
            </div>
        </div>
    );
};

export default MarketCap;
