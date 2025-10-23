"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./NotificationItem";
import Image from "next/image";
import { ChatItem } from "./ChatItem";

export default function ChatSideBar({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [messages, setMessages] = useState<
        { id: number; title: string; desc: string; time: string; isAdmin?: boolean }[]
    >([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // handle sending message
    const handleSend = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            title: "You",
            desc: newMessage.trim(),
            time: "Just now",
            isAdmin: false,
        };

        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
    };

    // handle enter / shift+enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

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
                            className="fixed top-0 right-0 h-full z-50
                                        border border-[#364349] border-b-[0.8px] border-b-[#364349]
                                        bg-[#181c1f]
                                        shadow-[0_1px_2px_0_#0000000D]
                                        flex flex-col    rounded-l-[12px]
                                        text-[#F8FAFC]
                                        w-full sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-full"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-8 right-4 text-white hover:text-[#F8FAFC]/70 transition cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="flex flex-col pb-4  px-6 gap-6 ">
                                <span className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                        <Image
                                            src="/profile.jpg"
                                            alt="profile"
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="flex flex-col gap-3 pt-1">
                                        <label className="font-lato font-semibold text-[14.75px] leading-[18.43px] align-middle text-white">
                                            Label Text
                                        </label>
                                        <span className="inline-block py-0.5 px-4 rounded-lg bg-[#4C4C4C] opacity-100">
                                            Span Text
                                        </span>
                                    </span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="inline-block   border border-white/50 rounded-full py-1 px-3 opacity-100">
                                        Active discussion
                                    </span>
                                    <span className="inline-block bg-brand-yellow/20   border border-brand-yellow text-brand-yellow rounded-full py-1 px-3 opacity-100">
                                        Active discussion
                                    </span>
                                </span>
                            </div>

                            {/* Example Content */}
                            <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar bg-[#131617] px-6 pt-6 flex-1">
                                {messages.length === 0 ? (
                                    <p className="text-[#94A3B8] text-sm text-center mt-10">
                                        No messages yet.
                                    </p>
                                ) : (
                                    messages.map((msg) => (
                                        <ChatItem
                                            key={msg.id}
                                            title={msg.title}
                                            desc={msg.desc}
                                            time={msg.time}
                                            isAdmin={msg.isAdmin}
                                        />
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            {/* 🔽 Fixed Footer Section */}
                            <div className="flex flex-col gap-4 bg-[#131617] p-4 sm:p-6 h-auto sm:h-72 w-full">
                                <div
                                    className="w-full border-t border-t-[#364349] bg-[#2730354D] opacity-100 p-4 sm:p-6 flex flex-col gap-4 rounded-lg"
                                >
                                    <textarea
                                        id="chat-input"
                                        name="chat-input"
                                        placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full min-h-[90px] sm:h-[100px] bg-[#131617] border border-[#21222C] rounded-[10px]
                 px-3 sm:px-[12.8px] py-[10.8px] text-white placeholder-gray-400
                 focus:outline-none focus:ring-1 focus:ring-[#2B2B31] resize-none text-sm sm:text-base"
                                    />

                                    <span className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                                        <p className="font-lato font-normal text-[12px] text-[#A1AAAA] text-center sm:text-left leading-4">
                                            Messages are visible to admins and project owners
                                        </p>

                                        <button
                                            onClick={handleSend}
                                            className="w-full sm:w-[153px] h-[40px] rounded-[10px] px-4 py-2 
                   flex items-center justify-center gap-2 sm:gap-4 
                   shadow-[0_0_30px_0_#2EC2B333]
                   font-lato font-semibold text-[14px] leading-5 text-center text-black
                   bg-brand-yellow hover:bg-brand-yellow/80 transition"
                                        >
                                            <Send size={14} />
                                            <span>Send</span>
                                        </button>
                                    </span>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
