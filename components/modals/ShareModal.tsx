"use client";
import React, { useState } from "react";
import { X, Copy } from "lucide-react";
import { UniversalContainer } from "@/components/ui/UniversalContainer";
import InputField from "@/components/ui/Input";
import { CustomToast } from "../ui/ReactToast";
import toast from "react-hot-toast";

interface ShareModalProps {
    open: boolean;
    onClose: () => void;
    postId: string;
    handleShare: () => void; // calls your handleAction("share")
}

export default function ShareModal({
    open,
    onClose,
    postId,
    handleShare,
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    if (!open) return null;

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/community/post/${postId}`
            : "";

    const handleCopy = async () => {
        if (!shareUrl) return;
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        handleShare(); // ✅ Increase share count in DB
        // ✅ Show toast
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message="Link copied successfully!"
            />
        ));
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <UniversalContainer
                size="lg"
                className="w-[90%] max-w-md p-6 bg-gradient-to-br from-[#121212] to-[#141B1F] border border-[#364349] rounded-[16px] shadow-lg"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#F8FAFC] font-inter font-semibold text-[20px]">
                        Share Post
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <p className="text-[#9CA3AF] text-sm">
                        Copy and share this link anywhere:
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            readOnly
                            value={shareUrl}
                            className="flex-1 bg-[#1E293B] text-[#E2E8F0] rounded-[10px] px-3 py-2 text-sm border border-[#334155]"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-[10px] font-semibold ${copied
                                ? "bg-green-500 text-white"
                                : "bg-[#FACC15] text-black hover:bg-yellow-400"
                                }`}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-[10px] border border-[#3B3B3B] bg-[#3B3B3B] text-[#F8FAFC] font-semibold"
                    >
                        Close
                    </button>
                </div>
            </UniversalContainer>
        </div>
    );
}
