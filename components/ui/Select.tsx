"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    lblClass?: string;
    btnClass?: string;
    dropBg?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    required = false,
    disabled = false,
    className = "",
    lblClass = "text-gray-400 text-sm",
    btnClass = "bg-[#1C1C1C] ",
    dropBg = "  backdrop-blur-md p-4  bg-[linear-gradient(160.73deg,#121212_0%,#141B1F_100%)]"
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel =
        options.find((opt) => opt.value === value)?.label || placeholder;

    return (
        <div className={`flex flex-col gap-2 relative  ${className}`} ref={ref}>
            <label htmlFor={name} className={lblClass}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Select button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3
                        border border-[#2B2B31] ${btnClass}
                        text-gray-200 font-medium cursor-pointer 
                        focus:outline-none focus:ring-2 focus:ring-brand-primary
                        transition disabled:opacity-50`}
            >
                <span
                    className={`${value ? "text-gray-200" : "text-gray-400"
                        } text-sm font-segoe`}
                >
                    {selectedLabel}
                </span>
                <ChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                    size={18}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={`absolute z-100 mt-18 w-full max-h-[240px] hide-scrollbar overflow-y-auto rounded-[12px] border border-[#364349] shadow-lg ${dropBg}`}
                >
                    {options.map((option) => {
                        const isSelected = value === option.value;
                        return (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`px-3 py-2 rounded-md cursor-pointer text-[14px] font-[500]
              transition-colors duration-200
              ${isSelected
                                        ? "bg-brand-yellow text-black font-semibold shadow-lg"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default SelectField;
