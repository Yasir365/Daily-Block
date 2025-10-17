"use client"
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { ProjectRow } from '../ProjectCard/ProjectRow';
import Link from 'next/link';

const columns = [
    { key: "score", label: "Score" },
    { key: "project", label: "Project" },
    { key: "start", label: "Start" },
    { key: "end", label: "End" },
    { key: "industry", label: "Industry" },
    { key: "btn", label: "" },
    { key: "coin", label: "" },
    { key: "launchpad", label: "Launch Pad" },
    { key: "totalRaised", label: "Total Raised" },
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
            <div className="bg-brand-glass p-6 md:p-8 rounded-2xl shadow-xl">

                {/* --- 3. Table Header (Using Grid for alignment) --- */}
                <div className="grid grid-cols-12 items-center p-4 border-b-2 border-gray-700 text-gray-300 font-semibold text-xs uppercase select-none">
                    {columns.map((col, i) => {
                        const colSpan = i === 0 ? 1 : i === 1 ? 2 : i === 5 ? 2 : i === 6 ? 2 : 1


                        return (
                            <div
                                key={col.key}
                                className={`col-span-${colSpan} flex items-center gap-1 cursor-pointer group`}
                                onClick={() => handleSort(col.key)}
                            >
                                {col.label && (<span className={`flex gap-2 items-center w-full ${i === 7 || i === 8 ? "justify-start" : "justify-center"} `}>
                                    <span className="group-hover:text-white transition">{col.label}</span>
                                    <ArrowUpDown
                                        size={14}
                                        className={`transition ${sortConfig.key === col.key
                                            ? "text-blue-400"
                                            : "text-gray-600 group-hover:text-gray-400"
                                            }`}
                                    />
                                </span>)}
                            </div>
                        )
                    })}
                </div>

                {/* --- 4. Table Rows --- */}
                <div className="divide-y divide-gray-700/50">
                    {mockProjectData.map((data, index) => (
                        <ProjectRow key={index} {...data} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserDataTableDiv