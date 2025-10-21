"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", users: 280, sessions: 20 },
    { day: "Tue", users: 360, sessions: 45 },
    { day: "Wed", users: 300, sessions: 35 },
    { day: "Thu", users: 420, sessions: 60 },
    { day: "Fri", users: 480, sessions: 70 },
    { day: "Sat", users: 390, sessions: 30 },
    { day: "Sun", users: 440, sessions: 40 },
];

export default function WeeklyGrowthChart() {
    // ✅ Detect screen width to adjust styling
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);
    return (
        <div className="h-[300px] sm:h-[380px] md:h-[456px] p-4 sm:p-6 md:p-8 rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
            <h2 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Weekly Growth
            </h2>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{
                        top: isMobile ? 5 : 10,
                        right: isMobile ? 10 : 20,
                        left: isMobile ? -10 : 10,
                        bottom: isMobile ? 10 : 0,
                    }}
                >
                    {/* Subtle grid lines */}
                    <CartesianGrid
                        stroke="#50505033"
                        vertical={false}
                        strokeDasharray="3 3"
                    />

                    {/* ✅ Responsive Y-Axis */}
                    <YAxis
                        stroke="#94A3B8"
                        axisLine={{ stroke: "#94A3B8", strokeWidth: 1 }}
                        tickLine={false}
                        tick={{
                            fill: "#94A3B8",
                            fontSize: isMobile ? 12 : 16,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            textAnchor: "end",
                        }}
                        tickMargin={isMobile ? 4 : 10}
                    />

                    {/* ✅ Responsive X-Axis */}
                    <XAxis
                        dataKey="day"
                        stroke="#94A3B8"
                        axisLine={{ stroke: "#94A3B8" }}
                        tickLine={false}
                        tick={{
                            fill: "#94A3B8",
                            fontSize: isMobile ? 12 : 16,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            textAnchor: "middle",
                        }}
                    />

                    <Tooltip
                        cursor={false}
                        contentStyle={{
                            background: "rgba(59,59,59,0.9)",
                            border: "1px solid #90909066",
                            borderRadius: "8px",
                            color: "#fff",
                            fontFamily: "Inter, sans-serif",
                            fontSize: isMobile ? 12 : 14,
                        }}
                    />

                    {/* 🟢 Green Line */}
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={false}
                    />

                    {/* 🟡 Yellow Line */}
                    <Line
                        type="monotone"
                        dataKey="sessions"
                        stroke="#FACC15"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
