"use client";

import React from "react";

interface InputFieldProps {
    label: string;
    name?: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    value,
    placeholder = "",
    onChange,
    required = false,
    disabled = false,
    className = "",
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="text-gray-400 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`flex-1 w-full bg-[#546466] text-gray-200 rounded-2xl px-4 py-3 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:opacity-50`}
            />
        </div>
    );
};

export default InputField;
