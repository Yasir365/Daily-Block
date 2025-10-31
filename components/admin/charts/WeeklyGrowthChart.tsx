"use client";

import { fetchGraphStats } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
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


export default function WeeklyGrowthChart() {
    // ✅ Detect screen width to adjust styling
    const [isMobile, setIsMobile] = useState(false);
    const {
        data: stats,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: () => fetchGraphStats("weekly"), // or "monthly"
    });
    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    if (isLoading) return <p className="text-white">Loading chart...</p>;
    if (isError) return <p className="text-red-400">Error loading data</p>;

    return (
        <div className="h-[300px] sm:h-[380px] md:h-[456px] p-4 sm:p-6 md:p-8 rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
            <h2 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Weekly Growth <span className="text-gray-400 text-sm">(Users & Projects)</span>
            </h2>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={stats?.growth || []}
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
                        formatter={(value, name) => {
                            // Capitalize tooltip labels
                            const label =
                                name === "users"
                                    ? "Users"
                                    : name === "projects"
                                        ? "Projects"
                                        : name;
                            return [value, label];
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
                        dataKey="projects"
                        stroke="#FACC15"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
