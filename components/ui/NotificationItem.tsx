import { Trash2 } from "lucide-react";
import StatusBadge from "./Badge";


export const NotificationItem = ({
    title,
    desc,
    time,
    isNew,
    onDelete,
}: {
    title: string;
    desc: string;
    time: string;
    isNew?: boolean;
    onDelete?: () => void;
}) => (
    <div
        className={`h-[124px] p-4 rounded-[12px] border border-[#2B2B31] flex flex-col justify-between ${isNew ? "bg-[#FACC150D]" : "bg-transparent"
            }`}
    >
        {/* Title Row */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h3 className="font-inter font-semibold text-[16px] leading-6 text-[#F8FAFC]">
                    {title}
                </h3>
                {isNew && <StatusBadge value="active" text="new" className={"text-[12px] leading-4 font-inter"} />}
            </div>

            {/* Delete Icon */}
            <button
                onClick={onDelete}
                className="text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
            >
                <Trash2 size={16} />
            </button>
        </div>

        {/* Description */}
        <p className="font-inter font-normal text-[14px] leading-5 text-[#94A3B8] mt-2">
            {desc}
        </p>

        {/* Time */}
        <span className="font-inter font-normal text-[12px] leading-4 text-[#94A3B8] mt-2">
            {time} ago
        </span>
    </div>
);
