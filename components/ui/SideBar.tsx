"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { NotificationItem } from "./NotificationItem";

export default function NotificationSidebar({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <>


            {/* Overlay + Sidebar */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0    z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)} // click outside to close
                        />

                        {/* Sidebar */}
                        <motion.div
                            className="fixed top-0.5 right-0 h-full w-[384px] max-w-[384px] z-50 
                         border border-[#364349]
                         bg-gradient-to-br from-[#121212] to-[#141B1F]
                         shadow-[0_1px_2px_0_#0000000D]
                         backdrop-blur-[4px]
                         flex flex-col p-6 gap-6 rounded-l-[12px]
                         text-[#F8FAFC]"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-8 right-4 text-white hover:text-[#F8FAFC]/70 transition cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 mt-16 ">
                                <h2 className="font-inter font-semibold text-[18px] leading-[28px] text-[#F8FAFC]"
                                >Notifications</h2>

                                {/* Mark all read */}
                                <button
                                    className="font-inter font-semibold text-[14px] leading-[20px] text-[#F8FAFC] hover:text-[#E2E8F0] transition"
                                >
                                    Mark all read
                                </button>

                            </div>

                            {/* Example Content */}
                            <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar ">
                                {[...Array(20)].map((_, i) => (
                                    <NotificationItem
                                        key={i}
                                        title={`Message ${i + 1}`}
                                        desc="Your weekly growth increased by 24% 📈"
                                        time={`${i + 1}h`}
                                        isNew={i < 2} // mark first 2 as new
                                        onDelete={() => console.log(`Delete notification ${i + 1}`)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
