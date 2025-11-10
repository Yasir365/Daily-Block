"use client";
import React, { useEffect, useRef } from "react";

type Tag = "div" | "dialog" | "section";

interface UniversalContainerProps<T extends Tag = "div"> {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "full";
    className?: string;
    onClickOutside?: () => void;
    as?: T;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

type TagElement<T extends Tag> =
    T extends "div"
    ? HTMLDivElement
    : T extends "dialog"
    ? HTMLDialogElement
    : T extends "section"
    ? HTMLElement
    : never;

let instanceCount = 0;

export const UniversalContainer = <T extends Tag = "div">({
    children,
    size = "md",
    className = "gap-6",
    as,
    onClick,
    onClickOutside,
}: UniversalContainerProps<T>) => {
    const Tag = as || "div";
    const containerRef = useRef<TagElement<T>>(null);
    const instanceId = useRef(++instanceCount);

    useEffect(() => {
        if (!onClickOutside) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (containerRef.current && !containerRef.current.contains(target)) {
                onClickOutside();
            }
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClick);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [onClickOutside]);

    const sizeClasses = {
        sm: "w-[180px]",
        md: "w-[224px]",
        lg: "w-[335px]",
        full: "calc(100% - 32px)",
    };

    return React.createElement(
        Tag,
        {
            ref: containerRef,
            className: `
        rounded-[12px] border border-[#364349]
        bg-gradient-to-br from-[#121212] to-[#141B1F]
        shadow-[0px_1px_2px_0px_#0000000D]
        backdrop-blur-[4px] flex flex-col opacity-100
        ${sizeClasses[size]}
        ${className}
        max-w-[95vw] sm:max-w-[90vw] md:max-w-none
        p-4 sm:p-5 md:p-6
      `,
            onClick,
        },
        children
    );
};
