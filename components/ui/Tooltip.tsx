"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}
export function Tooltip({ children, content, side = "top" }: TooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={150}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={side}
                        className="rounded-md bg-black text-white text-xs px-2 py-1 shadow-lg border border-white/10 animate-in fade-in"
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-black" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
