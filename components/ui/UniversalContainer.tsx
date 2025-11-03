interface UniversalContainerProps {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "full";
    className?: string;
    onClickOutside?: () => void;
    as?: "div" | "dialog" | "section";
    onClick?: React.MouseEventHandler<HTMLElement>; // ✅ works for all tags


}

export const UniversalContainer = ({
    children,
    size = "md",
    className = "gap-6",
    as: Tag = "div",
    onClick, // ✅ allow click handlers inside

}: UniversalContainerProps) => {
    const sizeClasses = {
        sm: "w-[180px]",
        md: "w-[224px]",
        lg: "w-[335px]",
        full: "calc(100% - 32px)",
    };

    return (
        <Tag
            className={`
                rounded-[12px] border border-[#364349]
                bg-gradient-to-br from-[#121212] to-[#141B1F]
                shadow-[0px_1px_2px_0px_#0000000D]
                backdrop-blur-[4px] flex flex-col opacity-100
                ${sizeClasses[size]}
                ${className}
                /* ✅ Responsive adjustments */
                max-w-[95vw] sm:max-w-[90vw] md:max-w-none
                p-4 sm:p-5 md:p-6
            `}
            onClick={onClick} // ✅ enables stopPropagation()

        >
            {children}
        </Tag>
    );
};
