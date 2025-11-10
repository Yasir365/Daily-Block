"use client";
import React from "react";

interface InputFieldProps {
    label: string;
    name?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
    lblCls?: string;
    inputClass?: string;
    lblIcon?: React.ReactNode;
    icon?: React.ReactNode;
    iconPlace?: "left" | "right";
    onIconClick?: () => void;
    lblHide?: boolean;
    error?: string;
    required?: boolean;
    onFocus?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    value,
    placeholder = "",
    onChange,
    disabled = false,
    className = "",
    lblCls = "text-gray-400 text-sm",
    inputClass = "bg-brand-glass placeholder-gray-400 rounded-xl",
    lblIcon = "",
    icon = "",
    iconPlace = "right",
    onIconClick,
    lblHide = false,
    error = "",
    required = false,
    onFocus
}) => {
    const hasIcon = Boolean(icon);
    const hasError = Boolean(error);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {/* Label */}
            {!lblHide && (
                <div className="min-h-[20px] flex items-center justify-between">
                    {label ? (
                        <label
                            htmlFor={name}
                            className={`${lblCls} capitalize flex items-center gap-1`}
                        >
                            {lblIcon}
                            {label}
                            {required && <span className="text-red-500">*</span>}
                        </label>
                    ) : (
                        <span className="block w-full h-[20px]" />
                    )}
                </div>
            )}

            {/* Input Wrapper */}
            <div className="relative flex items-center">
                {hasIcon && iconPlace === "left" && (
                    <div
                        className="absolute left-3 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
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
                    onFocus={onFocus} // ✅ handle focus
                    disabled={disabled}
                    // ❌ Don't add required here (use react-hook-form validation instead)
                    className={`flex-1 w-full ${inputClass} text-gray-200 px-4 py-2
          ${hasIcon ? (iconPlace === "right" ? "pr-12" : "pl-12") : ""}
          ${hasError ? "border border-red-500 focus:ring-red-500" : "focus:ring-brand-primary"}
          focus:outline-none focus:ring-2 transition disabled:opacity-50`}
                />

                {hasIcon && iconPlace === "right" && (
                    <div
                        className="absolute right-3 flex items-center justify-center cursor-pointer"
                        onClick={onIconClick}
                    >
                        {icon}
                    </div>
                )}
            </div>

            {/* Error message */}
            {hasError && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default InputField;
