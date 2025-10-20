import React from "react";

interface CircularProgressProps {
    value: number; // percentage (0–100)
    size?: number; // diameter in px
    strokeWidth?: number;
    color?: string; // progress color
    bgColor?: string; // track color
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 80,
    strokeWidth = 8,
    color = "#FFD43B",
    bgColor = "##4A4A4A",
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
                style={{ overflow: "visible" }}
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="square"
                    className="transition-all duration-700 ease-out"
                />
            </svg>

            {/* Center text */}
            <span className="absolute text-white font-semibold text-sm">
                {value}
            </span>
        </div>
    );
};

export default CircularProgress;
