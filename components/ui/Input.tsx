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
    lblCls?: string;
    inputClass?: string;
    lblIcon?: React.ReactNode
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
    lblCls = "text-gray-400 text-sm",
    inputClass = "bg-brand-glass placeholder-gray-400 ",
    lblIcon = ""
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className={`${lblCls} capitalize`}>
                {lblIcon}  {label} {required && <span className="text-red-500">*</span>}
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
                className={`flex-1 w-full ${inputClass} text-gray-200 rounded-xl px-4 py-2 
          focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:opacity-50`}
            />
        </div>
    );
};

export default InputField;
