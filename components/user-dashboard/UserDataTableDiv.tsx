"use client"
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { ProjectRow } from '../ProjectCard/ProjectRow';
import Link from 'next/link';
import { NewTableRow } from '../ProjectCard/NewTableRow';

const columns = [
    { key: "score", label: "Score" },
    { key: "project", label: "Project" },
    { key: "start", label: "Start" },
    { key: "end", label: "End" },
    { key: "industry", label: "Industry" },
    { key: "launchpad", label: "Launch Pad" },
    { key: "totalRaised", label: "Total Raised" },
    { key: "faq", label: "FAQ's" },
    { key: "discussion", label: "Discussion" },
];

const mockProjectData = [
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
];
const UserDataTableDiv = ({ title }: { title: string }) => {
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        onSort(key, direction);
    };
    const onSort = (key: string, direction: string) => {
        // Implement sorting logic here
        console.log(`Sorting by ${key} ${direction}`);
    };
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h5 className='text-[22px] font-bold'>{title}</h5>
                <span className='flex items-center gap-1 text-[#F9A51A]'>
                    <Image
                        src="/svg/coins/coin.svg"
                        alt="coin"
                        width={20}
                        height={20}
                        className="rounded-full invert-[74%] sepia-[78%] saturate-[1918%] hue-rotate-[357deg] brightness-[101%] contrast-[104%]"
                    />

                    <Link href='/user/add-coin' className='font-bold'>Add New Coin</Link>
                </span>
            </div>
            <div className="bg-brand-glass/90 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-700/50 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="min-w-[900px] md:min-w-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-11 items-center p-3 border-b border-gray-600/40 text-gray-300 text-xs md:text-sm font-semibold uppercase tracking-wide">
                        {columns.map((col, i) => {
                            const colSpan = i === 5 || i === 1 ? 2 : 1;

                            return (
                                <div
                                    key={col.key}
                                    className={`col-span-${colSpan} flex items-center justify-center gap-1 cursor-pointer group`}
                                    onClick={() => handleSort(col.key)}
                                >
                                    <span className="group-hover:text-white transition">{col.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-gray-700/30">
                        {mockProjectData.map((data, index) => (
                            <NewTableRow key={index} {...data} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDataTableDiv