import React from "react";

interface ChartTooltipProps {
    date: string;
    value: number;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ date, value }) => {
    console.log(date, value);
    return (
        <div
            className="
        relative 
        bg-[#0f0f0f] 
        text-white text-xs font-medium 
        rounded-md shadow-md 
        px-3 py-2 
        border border-[#007BFF]
        transform 
        -translate-x-1/2 
        -translate-y-10  /* 👈 move it upward (Tailwind = 2.5rem = 40px) */
      "
            style={{
                pointerEvents: "none",
                position: "absolute",
                top: "-40px", // ensures Apex attaches it above the point
                left: "50%",
            }}
        >
            {/* Tooltip content */}
            <div className="text-center leading-tight">
                <div>{date}</div>
                <div className="font-semibold">${value.toFixed(2)} Bln</div>
            </div>

            {/* Pointer arrow */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0f0f0f] border-l border-b border-[#007BFF]" />
        </div>
    );
};

export default ChartTooltip;
