"use client"
import { ArrowUpDown, ChevronDown, Search } from 'lucide-react';
import { ProjectRow } from './ProjectRow';
import { Switch } from 'antd';
import SwitchGroup from '../ui/SwitchGroup';
import { useState } from 'react';

const TABS = ['Presale/Whitelist', 'Active', 'Upcoming', 'Past'];

// Mock filter options (using placeholder data)
const FILTER_OPTIONS = ['Industry', 'Type'];

const mockProjectData = [
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
];

const handleSwitchChange = (activeSwitches: string[]) => {
    console.log("Active switches:", activeSwitches);
};


const columns = [
    { key: "score", label: "Score" },
    { key: "project", label: "Project" },
    { key: "start", label: "Start" },
    { key: "end", label: "End" },
    { key: "launch", label: "Launch" },
    { key: "launchpad", label: "Launchpad" },
    { key: "active", label: "Active" },
    { key: "totalRaised", label: "Total Raised" },
];
export const ProjectsFilterTable = () => {
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
        <section className="container mx-auto py-10">
            <div className="bg-[#2D2D2D] p-6 md:p-8 rounded-2xl shadow-xl">

                {/* --- 1. Tabs --- */}
                <div className="flex flex-wrap space-x-4 mb-6 border-b border-gray-700/50">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`pb-3 text-sm font-semibold transition-colors ${tab === 'Presale/Whitelist'
                                ? 'text-white border-b-2 border-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

                {/* --- 2. Filters and Search --- */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap gap-3">
                        {FILTER_OPTIONS.map((option) => (
                            <button
                                key={option}
                                className="flex items-center space-x-1 bg-brand-glass text-gray-400 text-sm py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                <span>{option}</span>
                                <ChevronDown size={16} />
                            </button>
                        ))}
                        <SwitchGroup
                            options={["White List", "KYC", "Bounty"]}
                            defaultActive={["White List", "KYC"]}
                            onChange={handleSwitchChange}
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-xs w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 pl-10 bg-gray-800/80 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* --- 3. Table Header (Using Grid for alignment) --- */}
                <div className="grid grid-cols-11 items-center p-4 border-b-2 border-gray-700 text-gray-300 font-semibold text-xs uppercase select-none">
                    {columns.map((col, i) => (
                        <div
                            key={col.key}
                            className={`col-span-${i === 0 ? 1 : i === 1 ? 2 : i === 5 ? 2 : 1} flex items-center gap-1 cursor-pointer group`}
                            onClick={() => handleSort(col.key)}
                        >
                            <span className="group-hover:text-white transition">{col.label}</span>
                            <ArrowUpDown
                                size={14}
                                className={`transition ${sortConfig.key === col.key
                                    ? "text-blue-400"
                                    : "text-gray-600 group-hover:text-gray-400"
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* --- 4. Table Rows --- */}
                <div className="divide-y divide-gray-700/50">
                    {mockProjectData.map((data, index) => (
                        <ProjectRow key={index} {...data} />
                    ))}
                </div>

                {/* --- 5. Footer Button --- */}
                <div className="text-center pt-8">
                    <button className="text-brand-yellow font-semibold hover:underline">
                        View All Projects
                    </button>
                </div>

            </div>
        </section>
    );
};