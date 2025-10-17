"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
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
}) => {
    const defaultOption: SelectOption = {
        value: "",
        label: placeholder,
    };

    const allOptions = [defaultOption, ...options];

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="text-gray-400 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`flex-1 w-full bg-brand-glass rounded-lg px-4 py-3 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:opacity-50
                    appearance-none cursor-pointer
                    ${value === "" ? "text-gray-400" : "text-gray-200"} // Value نہ ہونے پر placeholder color
                `}
                >
                    {allOptions.map((option, index) => (
                        <option
                            key={option.value || index}
                            value={option.value}
                            disabled={option.value === "" && index === 0}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
};

export default SelectField;