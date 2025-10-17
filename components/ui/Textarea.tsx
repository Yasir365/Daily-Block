"use client";

import React from "react";

interface TeextareaProps {
    label: string;
    name?: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // ✅ Fixed type
    required?: boolean;
    disabled?: boolean;
    className?: string;
    rows?: number;
    cols?: number;
}

const Teextarea: React.FC<TeextareaProps> = ({
    label,
    name,
    value,
    placeholder = "",
    onChange,
    required = false,
    disabled = false,
    className = "",
    rows = 4,
    cols = 50,
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="text-gray-400 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                disabled={disabled}
                rows={rows}
                cols={cols}
                className={`flex-1 w-full bg-brand-glass text-gray-200 rounded-lg px-4 py-3 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:opacity-50`}
            />
        </div>
    );
};

export default Teextarea;
