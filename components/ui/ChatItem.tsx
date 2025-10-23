import { Trash2, Bell, User } from "lucide-react";
import StatusBadge from "./Badge";
import Image from "next/image";

export const ChatItem = ({
    title,
    desc,
    time,
    isAdmin,
    onDelete,
}: {
    title: string;
    desc: string;
    time: string;
    isAdmin?: boolean;
    onDelete?: () => void;
}) => (
    <div
        className={`h-auto p-4 rounded-[12px] border border-[#2B2B31] flex flex-col gap-3 ${isAdmin ? "bg-[#FACC150D]" : "bg-transparent"
            }`}
    >
        {/* Top Row */}
        <div className="flex items-start justify-between">
            {/* Left: Icon/Image */}
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${isAdmin ? "bg-brand-yellow/20 text-brand-yellow" : "bg-[#364349] text-[#F8FAFC]"}`}
            >
                {/* You can replace <Bell /> with <Image /> if you want */}
                {isAdmin ? <Bell size={18} /> : <User size={18} />}
            </div>

            {/* Middle: Title + Admin */}
            <div className="flex flex-col flex-1 px-3">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="font-inter font-semibold text-[16px] leading-6 text-[#F8FAFC]">
                            {title}
                        </h3>
                        {/* <span className="font-inter text-[13px] text-[#94A3B8]">{isAdmin ? "Admin" : "asdad"}</span> */}
                        {
                            isAdmin && (
                                <StatusBadge
                                    value="active"
                                    text="Admin"
                                    className="text-[12px] leading-4 font-inter"
                                />
                            )}
                    </div>

                    {/* Time */}
                    <span className="font-inter text-[12px] text-[#94A3B8]">{time} ago</span>
                </div>

                {/* Description / Message */}
                <p className="font-lato font-normal text-[14px] leading-[22.75px] text-[#F1F4F4] mt-1">
                    {desc}
                </p>
            </div>


        </div>
    </div>
);
