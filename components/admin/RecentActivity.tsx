"use client";
import React from "react";

type Activity = {
    id: number;
    title: string;
    project: string;
    status: string;
    time: string;
    dotColor?: string; // e.g. bg-brand-yellow
    bgColor?: string;  // e.g. bg-brand-green
    borderColor?: string; // e.g. border-brand-green
    textColor?: string; // e.g. text-black or text-white
};

type Props = {
    activities: Activity[];
};


export const RecentActivity: React.FC<Props> = ({ activities }) => {
    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px] h-full sm:h-[350px] md:h-[456px]">
            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] leading-[24px] tracking-[-0.6px] text-[#F8FAFC]">
                Recent Activity
            </h2>
            <div className="flex-1 overflow-y-auto custom-scrollbar">

                <div className="flex flex-col gap-6  ">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex justify-between items-start cursor-pointer mx-1"
                        >
                            {/* Left side (dot + text) */}
                            <div className="flex gap-6 items-start">
                                <span
                                    className={`size-3 rounded-full mt-1 ${activity.dotColor || "bg-brand-yellow"
                                        }`}
                                ></span>

                                <div className="flex flex-col gap-1.5">
                                    <p className="font-inter font-medium text-[16px] leading-[20px] text-[#F8FAFC]">
                                        {activity.title}
                                    </p>
                                    <p className="font-inter font-normal text-[16px] leading-[20px] text-[#94A3B8]">
                                        {activity.project}
                                    </p>
                                </div>
                            </div>

                            {/* Right side (status + time) */}
                            <div className="flex flex-col gap-1.5 items-end">
                                <span
                                    className={`
                                            inline-flex items-center justify-center
                                            px-[10.8px] py-[2.8px]
                                            rounded-full border
                                            text-[14px] leading-[20px]
                                            font-inter font-semibold
                                            ${activity.bgColor || "bg-brand-yellow"}
                                            ${activity.borderColor || "border-brand-yellow"}
                                            ${activity.textColor || "text-black"}
                                        `}  
                                >
                                    {activity.status}
                                </span>

                                <p className="font-inter font-normal text-[16px] leading-[20px] text-[#94A3B8]">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
