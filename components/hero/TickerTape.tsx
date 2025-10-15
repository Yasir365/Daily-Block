"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data for the ticker tape
const mockCoins = [
    { name: "USD/EUR", price: 1.18977, change: -0.0036, trend: 'down' },
    { name: "Bitcoin", price: 115519, change: 132.08, trend: 'up' },
    { name: "Ethereum", price: 4511.6, change: -11.2, trend: 'down' },
    { name: "US 100 Cash CFD", price: 24760.0, change: 74.30, trend: 'up' },
    { name: "GO Index", price: 6620.1, change: -16.3, trend: 'down' },
];

const TickerItem = ({ name, price, change, trend }: typeof mockCoins[0]) => {
    const isUp = trend === 'up';
    const textColor = isUp ? 'text-green-500' : 'text-red-500';
    const formattedChange = Math.abs(change).toFixed(2);
    const sign = isUp ? '+' : '-';

    return (
        <div className="flex items-center space-x-2 mr-10 whitespace-nowrap">
            {/* <span className="text-white font-medium">{name}</span> */}
            <span className="text-white">{price.toLocaleString()}</span>
            <div className={`flex items-center ${textColor}`}>
                {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="ml-1 text-sm">
                    {sign}{formattedChange} ({sign}{(change / price * 100).toFixed(2)}%)
                </span>
            </div>
            <span className="text-gray-600">|</span>
        </div>
    );
};

export const TickerTape = () => {
    // We duplicate the list to ensure seamless looping in CSS Marquee
    const tickerItems = [...mockCoins, ...mockCoins, ...mockCoins];

    return (
        <div className="bg-gray-900 border-t border-gray-700 overflow-hidden py-3 mt-10">
            <div className="ticker-tape-animation flex">
                {tickerItems.map((coin, index) => (
                    <TickerItem key={index} {...coin} />
                ))}
            </div>
        </div>
    );
};