"use client";

import React from "react";
import {
    FileText,
    FileSpreadsheet,
    FileArchive,
    FileImage,
    FileVideo,
    FileAudio,
    FileType2,
    Presentation,
    Download,
} from "lucide-react";

interface DownloadCardProps {
    fileName: string;
    fileUrl: string;
    openInNewTab?: boolean;
}

const DownloadDiv: React.FC<DownloadCardProps> = ({
    fileName,
    fileUrl,
    openInNewTab = false,
}) => {
    // 🔍 Extract extension
    const extension = fileName?.split(".").pop()?.toLowerCase() || "";

    // 🎯 Match file type to related icon
    const getIcon = () => {
        switch (extension) {
            case "pdf":
                return <FileText size={40} className="text-white" />;

            case "doc":
            case "docx":
                return <FileType2 size={40} className="text-white" />;

            case "xls":
            case "xlsx":
                return <FileSpreadsheet size={40} className="text-white" />;

            case "ppt":
            case "pptx":
                return <Presentation size={40} className="text-white" />;

            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "webp":
                return <FileImage size={40} className="text-white" />;

            case "mp4":
            case "mov":
                return <FileVideo size={40} className="text-white" />;

            case "mp3":
            case "wav":
                return <FileAudio size={40} className="text-white" />;

            case "zip":
            case "rar":
            case "7z":
                return <FileArchive size={40} className="text-white" />;

            default:
                return <FileText size={40} className="text-white" />;
        }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleOpen = () => {
        if (openInNewTab) {
            window.open(fileUrl, "_blank");
        }
    };

    return (
        <div
            className="
                cursor-pointer group flex flex-col items-center justify-center
                border border-zinc-700 rounded-2xl p-6 shadow-lg 
                hover:shadow-2xl bg-[#8E8E93] opacity-[.3] 
                transition-all duration-300 hover:bg-zinc-800
                w-full h-full
            "
        >
            {/* Icon */}
            <div className="relative flex items-center justify-center">
                {getIcon()}
            </div>

            {/* File Name */}
            <p className="text-white mt-4 text-center text-sm">{fileName}</p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={handleDownload}
                    className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition"
                >
                    <Download size={18} className="text-white" />
                </button>

                {openInNewTab && (
                    <button
                        onClick={handleOpen}
                        className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition"
                    >
                        <FileText size={18} className="text-white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DownloadDiv;
