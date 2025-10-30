"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ConfirmProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CustomConfirm: React.FC<ConfirmProps> = ({
    open,
    title = "Are you sure?",
    message,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null; // 👈 important (don’t render when closed)

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-[100] bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Alert Box */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-[400px] rounded-2xl border border-[#364349] bg-gradient-to-br from-[#121212] to-[#141B1F] shadow-xl p-6 text-[#F8FAFC]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onCancel}
                            className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-2 text-[#F8FAFC]">
                            {title}
                        </h2>

                        {/* Message */}
                        <p className="text-sm text-[#CBD5E1] mb-6">{message}</p>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer border-gray-600 hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-black transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CustomConfirm;
