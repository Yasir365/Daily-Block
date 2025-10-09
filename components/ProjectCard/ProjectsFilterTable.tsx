import { ChevronDown, Search } from 'lucide-react';
import { ProjectRow } from './ProjectRow';

const TABS = ['Presale/Whitelist', 'Active', 'Upcoming', 'Past'];

// Mock filter options (using placeholder data)
const FILTER_OPTIONS = ['Industry', 'Type', 'Whitelis?', 'KYC', 'Audit', 'Active'];

const mockProjectData = [
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
    { project: "Antidote", date: "22 Aug", fundRaised: "$4,000,000", launchpad: "" },
];

export const ProjectsFilterTable = () => {
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
                <div className="grid grid-cols-10 items-center p-4 border-b-2 border-gray-700 text-gray-400 font-semibold text-xs uppercase">
                    <div className="col-span-2">Project</div>
                    <div className="col-span-1">Start</div>
                    <div className="col-span-1">End</div>
                    <div className="col-span-1">Launch</div>
                    <div className="col-span-2">Launchpad</div>
                    <div className="col-span-1 text-center">Active</div>
                    <div className="col-span-2">Total Raised</div>
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