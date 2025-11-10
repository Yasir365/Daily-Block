// components/community/Post/PostActions.tsx
"use client";
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { CustomToast } from "../ui/ReactToast";

interface Props {
    likes: string[];
    shares: string[];
    reposts: { userId: string }[];
    commentsCount: number;
    userId?: string;
    onCommentClick: () => void;
    showComments: boolean;
    handleAction: (action: "like" | "repost" | "share") => { error?: string };
    isPending: boolean;
}

export const PostActions: React.FC<Props> = ({
    likes,
    shares,
    reposts,
    userId,
    commentsCount,
    showComments,
    handleAction,
    onCommentClick,
    isPending,
}) => {
    const handleActionBtn = (str: "like" | "repost" | "share") => {
        const returnResp: { error?: string } = handleAction(str)
        console.log(returnResp)
        if (returnResp?.error) {
            toast.custom((t) => (
                <CustomToast status="error" t={t} message={returnResp.error || "Something went wrong"} />
            ))
        }
    }
    return (
        <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
            <div className="flex gap-3">
                {/* ❤️ Like */}
                <button
                    onClick={() => handleActionBtn("like")}
                    disabled={isPending}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 border border-[rgb(36,46,64)] transition hover:text-red-400 ${isPending ? "opacity-50 cursor-wait" : ""
                        }`}
                >
                    <Heart
                        size={18}
                        className={
                            likes?.some((id) => id?.toString() === userId?.toString())
                                ? "fill-red-500 text-red-500"
                                : ""
                        }
                    />
                    {likes?.length || 0}
                </button>

                {/* 💬 Comment */}
                <button
                    onClick={onCommentClick}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 border border-[rgb(36,46,64)] transition ${showComments ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                        }`}
                >
                    <MessageCircle size={18} /> {commentsCount}
                </button>

                {/* 🔁 Repost */}
                {/* <button
                    onClick={() => handleActionBtn("repost")}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 border border-[rgb(36,46,64)] transition hover:text-green-400 ${reposts?.some((r) => r?.userId?.toString() === userId?.toString())
                        ? "text-green-400"
                        : ""
                        }`}
                >
                    <Repeat2 size={18} /> {reposts?.length || 0}
                </button> */}

                {/* 📤 Share */}
                <button
                    onClick={() => handleActionBtn("share")}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 border border-[rgb(36,46,64)] transition hover:text-yellow-400 ${shares?.some((id) => id?.toString() === userId?.toString())
                        ? "text-yellow-400"
                        : ""
                        }`}
                >
                    <Share2 size={18} /> {shares?.length || 0}
                </button>
            </div>
        </div>
    )
};
