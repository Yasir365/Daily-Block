"use client";

import { Edit, Ban, FileText, SquarePen, Trash2 } from "lucide-react";
import Wrapper from "../layoutCard/Wrapper";
import StatusBadge from "@/components/ui/Badge";

type DataListProps = {
    title?: string;
    desc?: string;
    data: any[];
    children?: React.ReactNode;
    onDelete?: (id: string) => void;
    onSearch?: (value: string) => void;
    search?: string;
    isLoading?: boolean;
    onEdit?: (blog: any) => void;
    mode?: "create" | "edit";

};

export default function DataList({
    title,
    desc,
    data,
    children,
    onDelete,
    isLoading, onEdit
}: DataListProps) {
    if (isLoading) return <p className="text-gray-400 p-4">Loading blogs...</p>;

    return (

        <Wrapper title={title} desc={desc} children2={children}>
            <div className="overflow-y-auto flex flex-col mt-4 gap-3 px-4 sm:px-8 min-h-[200px] max-h-[600px]">
                {data.map((row, i) => (
                    <ListDiv
                        key={i}
                        {...row}
                        onDelete={() => onDelete && onDelete(row._id)}
                        onEdit={() => onEdit && onEdit(row)}

                    />
                ))}
            </div>
        </Wrapper>
    );
}
type propsList = {
    title: string,
    desc: string,
    date: string,
    views: string,
    status: string,
    onDelete?: () => void
    onEdit?: () => void

}
const ListDiv = ({ title, desc, date, views, status, onDelete, onEdit }: propsList) => {
    return <div className="flex flex-col p-4 sm:p-6 gap-3 border border-[#21222C] rounded-xl bg-[#2f2f2f20] backdrop-blur-[4px] hover:bg-[#3a3a3a40] transition-all">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
                <FileText className="text-[#8347EB]" strokeWidth={2} />
                <span className="font-inter font-semibold text-[16px] sm:text-[18px] leading-[24px] text-[#F8FAFC]">
                    {title}
                </span>
            </div>
            <div className="flex gap-4">
                <SquarePen
                    onClick={onEdit}
                    className="cursor-pointer text-gray-300 hover:text-white"
                    size={18}
                />
                <Trash2
                    onClick={onDelete}
                    className="text-brand-red cursor-pointer hover:text-red-400"
                    size={18}
                />
            </div>
        </div>

        {/* Description */}
        <p className="font-inter font-normal text-[14px] leading-[20px] text-[#94A3B8] break-words">
            {desc}
        </p>

        {/* Footer (Status + Meta Info) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#94A3B8]">
            <StatusBadge value={status} text={status} />
            <p className="whitespace-nowrap">Published on {date}</p>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[#94A3B8]" />
            <p className="whitespace-nowrap">{views} views</p>
        </div>
    </div>
}