import Link from "next/link";
import { Check, X, MessageSquare } from "lucide-react";
import CircularProgress from "../ui/CircularProgressBar";
import Image from "next/image";
import ChatSideBar from "../ui/ChatSideBar";
import { useState } from "react";

interface ProjectRowProps {
    project: string;
    date: string;
    launchpad: string;
    fundRaised: string;
}

export const NewTableRow = ({ project, date, launchpad, fundRaised }: ProjectRowProps) => {
    const isAvailable = Math.random() > 0.5;
    const [chatOpen, setChatOpen] = useState(false);

    return (
        <div
            className="
    grid grid-cols-11 items-center
    p-4 hover:bg-[#2A2A2A]/40 rounded-lg transition-all duration-300
    gap-x-[30px] sm:gap-x-[20px] md:gap-x-4 lg:gap-x-6
  "
        >

            {/* Score */}
            <div className="col-span-1 flex justify-center mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-full border bg-[#48474b] border-gray-400 flex items-center justify-center text-white font-semibold">
                    97
                </div>
            </div>

            {/* Project */}
            <div className="col-span-2 flex flex-wrap sm:flex-nowrap items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src="/profile.jpg"
                        alt="Project"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <p className="font-lato font-semibold tracking-tight text-sm sm:text-base">{project}</p>
                    <span className="bg-[#4C4C4C] text-[11px] sm:text-xs px-2 py-0.5 rounded-md text-gray-200">
                        Retrodrop 🔥
                    </span>
                </div>
            </div>

            {/* Start */}
            <div className="col-span-1 text-center text-[13px] sm:text-[14.75px] leading-[22.12px] font-lato text-white mb-1 sm:mb-0">
                {date}
            </div>

            {/* End */}
            <div className="col-span-1 text-center text-[13px] sm:text-[14.75px] leading-[22.12px] font-lato text-white mb-1 sm:mb-0">
                23 Aug
            </div>

            {/* Industry */}
            <div className="col-span-2 flex justify-center text-center mb-1 sm:mb-0">
                <span className="bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 text-[11px] sm:text-sm px-3 py-0.5 rounded-full font-medium break-words whitespace-normal leading-snug">
                    Blockchain Infrastructure
                </span>
            </div>

            {/* Launchpad */}
            <div className="col-span-1 flex justify-center mb-1 sm:mb-0">
                <span className="border border-[#2EC2B380] text-brand-yellow text-[11px]  text-sm md:text-normal px-4 py-0.5 rounded-full font-medium">
                    {launchpad || "Token Soft"}
                </span>
            </div>

            {/* Total Raised */}
            <div className="col-span-1 flex justify-center items-center text-white mb-1 sm:mb-0">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-sm sm:text-base">{fundRaised}</span>
                    <span className="text-brand-yellow text-xs flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +0.38%
                    </span>
                </div>
            </div>

            {/* FAQ */}
            <div className="col-span-1 flex justify-center mb-1 sm:mb-0">
                <button className="bg-brand-yellow text-black text-[11px] sm:text-sm font-bold px-3 py-0.3 rounded-full hover:brightness-110 transition">
                    Add FAQ’s
                </button>
            </div>

            {/* Discussion */}
            <div className="col-span-1 flex justify-center mb-1 sm:mb-0">
                <span
                    onClick={() => setChatOpen(true)}
                    className="inline-flex relative font-lato text-[#F1F4F4] font-semibold text-[12px] sm:text-sm bg-[#484C4F] rounded-xl py-1.5 px-3 items-center gap-4"
                >
                    <span className="absolute top-[-8px] -right-2 flex items-center justify-center size-6 text-black bg-brand-yellow rounded-full">
                        2
                    </span>
                    <MessageSquare /> Discuss
                </span>
            </div>

            <ChatSideBar open={chatOpen} setOpen={setChatOpen} />
        </div>
    );
};
