"use client"
import { ArrowUpDown, ChevronDown, Search } from 'lucide-react';
import { ProjectRow, ProjectRowProps } from './ProjectRow';
import { Switch } from 'antd';
import SwitchGroup from '../ui/SwitchGroup';
import { useState } from 'react';

const TABS = ['Presale/Whitelist', 'Active', 'Upcoming', 'Past'];

// Mock filter options (using placeholder data)
const FILTER_OPTIONS = ['Industry', 'Type'];

const mockProjectData: ProjectRowProps[] = [
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    },
    {
        project: "Antidote",
        startdate: "22 Aug",
        enddate: "22 Aug",
        totalsupply: "100,000,000",
        price: "$0.10",
        fundRaised: "$4,000,000",
        launchpad: "",
        symbol: "$",
        status: "verified"
    }
];


const handleSwitchChange = (activeSwitches: string[]) => {
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
    };
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="bg-brand-glass/70 backdrop-blur-xl border border-gray-700/50 p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)]">

                {/* --- 1. Tabs --- */}
                <div className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4 mb-6 border-b border-gray-700/50 overflow-x-auto scrollbar-hide">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`pb-3 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${tab === "Presale/Whitelist"
                                ? "text-white border-b-2 border-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- 2. Filters and Search --- */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                        {FILTER_OPTIONS.map((option) => (
                            <button
                                key={option}
                                className="flex items-center space-x-1 bg-brand-glass text-gray-400 text-sm py-2 px-3 sm:px-4 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                <span>{option}</span>
                                <ChevronDown size={16} />
                            </button>
                        ))}
                        <div className="mt-2 sm:mt-0">
                            <SwitchGroup
                                options={["White List", "KYC", "Bounty"]}
                                defaultActive={["White List", "KYC"]}
                                onChange={handleSwitchChange}
                            />
                        </div>
                    </div>


                </div>

                {/* --- 3 & 4. Table (Scrollable on Mobile) --- */}
                <div className="w-full overflow-x-auto rounded-xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <div className="min-w-full lg:min-w-[900px]">
                        {/* --- 3. Table Header --- */}
                        <div className="grid grid-cols-11 items-center p-4 border-b-2 border-gray-700 text-gray-300 font-semibold text-xs uppercase select-none min-w-max">
                            {columns.map((col, i) => (
                                <div
                                    key={col.key}
                                    className={`col-span-${i === 0 ? 1 : i === 1 ? 2 : i === 5 ? 2 : 1
                                        } flex items-center gap-1 cursor-pointer group`}
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
                        <div className="divide-y divide-gray-700/50 min-w-max">
                            {mockProjectData.map((data, index) => (
                                <ProjectRow key={index} {...data} />
                            ))}
                        </div>
                    </div>
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