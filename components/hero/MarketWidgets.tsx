// components/ui/MarketWidgets.tsx

import { TrendingUp, TrendingDown } from "lucide-react";

// Placeholder component for the Chart (You'll integrate a charting library here)
const ChartPlaceholder = ({ trend }: { trend: 'up' | 'down' }) => (
    <div className={`h-12 w-full rounded-b-lg flex items-end p-1`}>
        {/* Placeholder for a small sparkline chart */}
        <div className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? "📈 Data trend up" : "📉 Data trend down"}
        </div>
    </div>
);

export const MarketWidgets = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

            {/* Widget 1: Market Cap */}
            <div className="flex-1 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 p-4">
                <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">84.03T</h3>
                    <div className="flex items-center text-green-500 text-sm">
                        <TrendingUp size={16} />
                        <span className="ml-1">+1.55%</span>
                    </div>
                </div>
                {/* Chart placeholder */}
                <ChartPlaceholder trend="up" />
            </div>

            {/* Widget 2: Fear & Greed Index */}
            <div className="flex-1 bg-gray-700/50 rounded-lg border border-gray-600 p-4">
                <p className="text-gray-400 text-sm mb-1">Fear & Greed</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">51</h3>
                    <span className="text-orange-400 text-sm">NEUTRAL</span>
                </div>
                {/* Index meter placeholder */}
                <div className="h-2 w-full bg-gray-600 rounded-full mt-2 relative">
                    {/* Placeholder for the meter fill */}
                    <div className="h-2 bg-orange-400 rounded-full" style={{ width: '51%' }}></div>
                </div>
            </div>
        </div>
    );
};