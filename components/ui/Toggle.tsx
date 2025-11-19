"use client";

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    variant?: "primary" | "white";
}

export const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    variant = "primary",
}) => {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`
        relative w-10 h-[22px] flex items-center rounded-full border-2 transition-all duration-300

        /* PRIMARY BASE (only when OFF) */
        ${variant === "primary" && !checked ? "border-[var(--color-brand-yellow)] bg-transparent" : "hover:bg-[rgba(237,194,64,0.1)]"}

        /* PRIMARY ON STATE → RED */
        ${variant === "primary" && checked ? "border-[var(--color-brand-yellow)] bg-[#ec5058]" : "hover:bg-[rgba(237,194,64,0.1)]"}

        /* WHITE BASE */
        ${variant === "white" && !checked ? "bg-[#ececf1] border-[#ececf1]" : "hover:bg-[rgba(237,194,64,0.1)]"}

        /* WHITE ON */
        ${variant === "white" && checked ? "bg-[var(--color-brand-yellow)] border-[var(--color-brand-yellow)]" : "hover:bg-[rgba(237,194,64,0.1)]"}

        
      `}
        >
            <span
                className={`
          absolute w-[14px] h-[14px] rounded-full shadow transition-all duration-300

          /* OFF knob = Yellow */
          ${!checked ? "translate-x-[2px] bg-[var(--color-brand-yellow)]" : ""}

          /* ON knob = White */
          ${checked ? "translate-x-[18px] bg-white" : ""}
        `}
            />
        </button>
    );
};
