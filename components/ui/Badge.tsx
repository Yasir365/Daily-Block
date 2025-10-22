import React from "react";
import clsx from "clsx";

interface StatusBadgeProps {
    value: string; // e.g. "active", "suspended", "pending"
    className?: string;
    text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ value, text, className }) => {
    const statusClasses = clsx(
        "px-3 py-1 rounded-full text-xs font-semibold capitalize w-fit",
        {
            "bg-brand-yellow text-black": value === "active",
            "bg-brand-purple/10 text-brand-purple border border-brand-purple/20": value === "coin",
            "bg-brand-green/10 text-brand-green border border-brand-green/20": value === "active_success",
            "bg-brand-green/10 text-brand-green": value === "active-trans",
            "bg-brand-red text-white": value === "suspended",
            "bg-blue-500 text-white": value === "pending",
            "bg-gray-500 text-white": value === "inactive",
        },
        className
    );

    return <span className={statusClasses}>{text}</span>;
};

export default StatusBadge;
