"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { NotificationItem } from "./NotificationItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications, markAllNotificationsRead, markNotificationRead } from "@/services/notificationService";
import { useRouter } from "next/navigation";

export default function NotificationSidebar({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const queryClient = useQueryClient();

    const { data: latestNotifications } = useQuery({
        queryKey: ["notifications", "latest"],
        queryFn: () => fetchNotifications({ mode: "all" }),
    });
    const notifications = latestNotifications || [];
    const router = useRouter();

    // ✅ Mutation: mark single notification as read
    const markOneMutation = useMutation({
        mutationFn: (id: string) => markNotificationRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications", "latest"] });
        },
    });

    // ✅ Mutation: mark all notifications as read
    const markAllMutation = useMutation({
        mutationFn: () => markAllNotificationsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications", "latest"] });
        },
    });
    const handleClick = (url: string, id: string, isAdmin?: boolean) => {
        markOneMutation.mutate(id)
        if (isAdmin) {
            // router.push("/admin");
            switch (url) {
                case "ico":
                    router.push("/admin/icto-management");
                    break;
            }
        } else {
            switch (url) {
                case "blog":
                    router.push("/blogs");
                    break;
            }
        }
    }
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
                                    onClick={() => markAllMutation.mutate()}
                                    disabled={markAllMutation.isPending}

                                    className="font-inter font-semibold text-[14px] leading-[20px] text-[#F8FAFC] hover:text-[#E2E8F0] transition"
                                >
                                    {markAllMutation.isPending ? "Marking..." : "Mark all read"}
                                </button>

                            </div>

                            {/* Example Content */}
                            <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar ">
                                {latestNotifications?.data?.map((_: { _id: string, title: string, message: string, isRead: boolean, type: string, forAdmin: boolean }, i: number) => (
                                    <NotificationItem
                                        key={i}
                                        title={_.title}
                                        desc={_.message}
                                        time={`${i + 1}h`}
                                        isNew={!_.isRead} // mark first 2 as new
                                        onClick={handleClick} // ✅ Mark single read
                                        onDelete={() => console.log(`Delete notification ${i + 1}`)}
                                        type={_.type}
                                        isAdmin={_.forAdmin}
                                        _id={_._id}
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
