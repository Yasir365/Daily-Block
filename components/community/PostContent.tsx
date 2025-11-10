// components/community/Post/PostContent.tsx
"use client";
import React from "react";

interface Props {
    title: string;
    description: string;
    image?: string;
}

export const PostContent: React.FC<Props> = ({ title, description, image }) => (
    <div>
        <p className="text-sm mb-2">
            <span className="text-yellow-400 font-semibold">#Bitcoin</span> {title}
        </p>
        <p className="text-gray-300 text-sm">{description}</p>
        {image && (
            <div className="mt-3">
                <img src={image} alt="post" className="w-full rounded-xl" />
            </div>
        )}
    </div>
);
