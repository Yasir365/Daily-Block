"use client";

import React from "react";

interface StatusBadgeProps {
    status: "draft" | "pending" | "approved" | "rejected" | "verified" | "suspended" | string;
    launchpad?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const normalizedStatus = status?.toLowerCase();

    const statusClasses =
        normalizedStatus === "approved"
            ? "bg-green-600 text-white"
            : normalizedStatus === "pending"
                ? "bg-yellow-500 text-black"
                : normalizedStatus === "rejected"
                    ? "bg-red-600 text-white"
                    : normalizedStatus === "draft"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-700 text-white";

    return (
        <span
            className={`${statusClasses} py-1.5 px-3 rounded-md text-xs font-semibold capitalize transition duration-200`}
        >
            {normalizedStatus || "Unknown"}
        </span>
    );
};

export default StatusBadge;
