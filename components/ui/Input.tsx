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
    lblIcon?: React.ReactNode;
    icon?: React.ReactNode; // Can now be a single icon or custom HTML
    iconPlace?: "left" | "right";
    onIconClick?: () => void;
    lblHide?: boolean
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
    inputClass = "bg-brand-glass placeholder-gray-400  rounded-xl",
    lblIcon = "",
    icon = "",
    iconPlace = "right",
    onIconClick,
    lblHide = false
}) => {
    const hasIcon = Boolean(icon);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {/* Label */}
            {!lblHide && <div className="min-h-[20px] flex items-center">
                {label ? (
                    <label htmlFor={name} className={`${lblCls} capitalize flex items-center gap-1`}>
                        {lblIcon}
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </label>
                ) : (
                    // Empty placeholder to maintain consistent height
                    <span className="block w-full h-[20px]" />
                )}
            </div>
            }

            {/* Input Wrapper */}
            <div className="relative flex items-center">
                {/* Left icon */}
                {hasIcon && iconPlace === "left" && (
                    <div
                        className="absolute left-3 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
                        onClick={onIconClick}
                    >
                        {icon}
                    </div>
                )}

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`flex-1 w-full ${inputClass} text-gray-200 px-4 py-2
            ${hasIcon ? (iconPlace === "right" ? "pr-12" : "pl-12") : ""}
            focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:opacity-50`}
                />

                {/* Right icon / custom node */}
                {hasIcon && iconPlace === "right" && (
                    <div
                        className="absolute right-3 flex flex-col items-center justify-center gap-1 cursor-pointer"
                        onClick={onIconClick}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;
