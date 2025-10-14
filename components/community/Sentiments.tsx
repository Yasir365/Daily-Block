import React from "react";

const Sentiments = () => {
    return (
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <h3 className="text-sm font-semibold mb-3">Community Sentiment</h3>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>80%</span>
                <span>20%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full">
                <div className="h-full bg-green-500 rounded-full w-[80%]"></div>
            </div>

            <div className="flex justify-between items-center gap-2 text-xs text-gray-400 mt-2">
                <button className="text-center py-2 rounded border border-green text-green w-[100%]">Bullish</button>
                <button className="text-center py-2 rounded border border-red w-[100%]">Bearish</button>
            </div>
        </div>
    );
};

export default Sentiments;
