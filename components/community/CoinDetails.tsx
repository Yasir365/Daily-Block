import React from "react";

const CoinDetails = () => {
    return (
        <div className="bg-brand-glass p-4 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">PERL.eco (PERL)</h3>
                <span className="text-gray-400">#2586</span>
            </div>

            <p className="text-2xl font-bold">$0.0003110</p>
            <p className="text-red-500 text-sm">-5.08%</p>

            <div className="mt-3 text-xs text-gray-400 space-y-1">
                <p>Market Cap: <span className="text-white">$152.7K</span></p>
                <p>Volume (24h): <span className="text-white">$20.1K</span></p>
                <p>Holders: <span className="text-white">12.5K</span></p>
            </div>
        </div>
    );
};

export default CoinDetails;
