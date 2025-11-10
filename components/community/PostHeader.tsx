// components/community/Post/PostHeader.tsx
"use client";
import Image from "next/image";
import React from "react";

interface Props {
    username: string;
    active: boolean;
    time: string;
}

export const PostHeader: React.FC<Props> = ({ username, active, time }) => (
    <div className="flex items-center gap-3 mb-3">
        <img src="svg/community/coin.svg" alt={username} className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
            <div className="flex items-center gap-1">
                <h4 className="font-semibold text-sm">{username}</h4>
                {active && <Image src="/svg/verified.svg" alt="verified" width={16} height={16} />}
            </div>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    </div>
);
