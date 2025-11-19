"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SwitchGroup from "../ui/SwitchGroup";
import { ProjectRow } from "./ProjectRow";
import { useNewlyListed } from "@/hooks/useListedCoints";
import SelectField from "../ui/Select";

// Tabs define project phases
const TABS = [
    { label: "Presale/Whitelist", value: "presale" },
    { label: "Active", value: "active" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
];

// SelectField Options — MODIFY based on your need
const industryOptions = [
    { label: "Blockchain", value: "blockchain" },
    { label: "DeFi", value: "defi" },
    { label: "Gaming", value: "gaming" },
    { label: "AI", value: "ai" },
];

const typeOptions = [
    { label: "ERC20", value: "ERC20" },
    { label: "BEP20", value: "BEP20" },
    { label: "Solana", value: "solana" },
    { label: "Polygon", value: "polygon" },
];

export const ProjectsFilterTable = () => {
    // 🔥 Filters
    const [phase, setPhase] = useState("active");
    const [industry, setIndustry] = useState("");
    const [type, setType] = useState("");
    const [switchFilters, setSwitchFilters] = useState({
        whitelist: false,
        kyc: false,
        bounty: false,
    });

    // Sorting
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "",
    });

    // Fetch Data With All Filters
    const { data: listed, isLoading } = useNewlyListed({
        phase,
        industry,
        type,
        whitelist: switchFilters.whitelist,
        kyc: switchFilters.kyc,
        bounty: switchFilters.bounty,
        sort: "newest",
        status: "approved",
    });

    const projects = listed?.data || [];

    // Sorting Logic
    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedProjects = [...projects].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const x: any = a[sortConfig.key];
        const y: any = b[sortConfig.key];

        if (sortConfig.direction === "asc") return x > y ? 1 : -1;
        return x < y ? 1 : -1;
    });

    // SwitchGroup Logic
    const handleSwitchChange = (activeSwitches: string[]) => {
        setSwitchFilters({
            whitelist: activeSwitches.includes("White List"),
            kyc: activeSwitches.includes("KYC"),
            bounty: activeSwitches.includes("Bounty"),
        });
    };

    return (
        <section className="container mx-auto px-4 py-10">
            <div className="bg-brand-glass/70 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl">

                {/* -------- Tabs -------- */}
                <div className="flex space-x-4 mb-6 border-b border-gray-700/50">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setPhase(tab.value)}
                            className={`pb-3 font-semibold ${phase === tab.value
                                ? "text-white border-b-2 border-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ------- Filters ------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    <div className="flex gap-3 items-center">

                        {/* Industry Filter */}
                        <SelectField
                            label="Industry"
                            name="industry"
                            options={industryOptions}
                            placeholder="Select Industry"
                            value={industry}
                            onChange={(val) => setIndustry(val)}
                            lblClass="text-[14px] font-semibold"
                            className="w-full md:w-1/3"   // 👈 width control HERE
                            btnClass="bg-[#454646]"
                            dropBg="  backdrop-blur-md p-4 !mt-19 bg-[linear-gradient(160.73deg,#454646_0%,#454646_100%)]"


                        />

                        {/* Type Filter */}
                        <SelectField
                            label="Type"
                            name="type"
                            options={typeOptions}
                            placeholder="Select Type"
                            value={type}
                            onChange={(val) => setType(val)}
                            lblClass="text-[14px] font-semibold"
                            className="w-full md:w-1/3"   // 👈 width control HERE
                            btnClass="bg-[#454646]"
                            dropBg="  backdrop-blur-md p-4 !mt-19 bg-[linear-gradient(160.73deg,#454646_0%,#454646_100%)]"


                        />
                    </div>

                    {/* SwitchGroup */}
                    <SwitchGroup
                        options={["White List", "KYC", "Bounty"]}
                        defaultActive={[]}
                        onChange={handleSwitchChange}
                    />
                </div>

                {/* -------- Table -------- */}
                <div className="w-full overflow-x-auto rounded-xl">
                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div className="grid grid-cols-12 p-4 border-b-2 border-gray-700 text-gray-300 font-semibold text-xs uppercase">
                            <div className="col-span-1">Score</div>

                            <div className="col-span-1 cursor-pointer" onClick={() => handleSort("cryptoCoinName")}>
                                Project
                            </div>

                            <div className="col-span-1 cursor-pointer" onClick={() => handleSort("icoStartDate")}>
                                Start
                            </div>

                            <div className="col-span-1 cursor-pointer" onClick={() => handleSort("icoEndDate")}>
                                End
                            </div>

                            <div className="col-span-2 cursor-pointer" onClick={() => handleSort("totalSupply")}>
                                Total Supply
                            </div>

                            <div className="col-span-2 cursor-pointer" onClick={() => handleSort("icoTokenPrice")}>
                                Price
                            </div>

                            <div className="col-span-2">Active</div>
                            <div className="col-span-1">Status</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-gray-700/50">
                            {isLoading ? (
                                <p className="text-gray-400 p-4">Loading...</p>
                            ) : sortedProjects.length === 0 ? (
                                <p className="text-gray-400 p-4">No projects found.</p>
                            ) : (
                                sortedProjects.map((item: any) => (
                                    <ProjectRow
                                        key={item._id}
                                        project={item.cryptoCoinName}
                                        startdate={item.icoStartDate}
                                        enddate={item.icoEndDate}
                                        totalsupply={item.totalSupply}
                                        price={`$${item.icoTokenPrice}`}
                                        fundRaised={item.received}
                                        launchpad={item.websiteLink}
                                        symbol={item.coinAbbreviation}
                                        status={item.status}
                                    />
                                ))
                            )}
                        </div>

                    </div>
                </div>

                <div className="text-center pt-8">
                    <button className="text-brand-yellow font-semibold hover:underline">
                        View All Projects
                    </button>
                </div>

            </div>
        </section>
    );
};
