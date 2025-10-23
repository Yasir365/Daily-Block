"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import InputField from '@/components/ui/Input';
import SelectField from '@/components/ui/Select';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { Ban, Edit, Funnel, Shield, X } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [data, setData] = useState({ status: "Neutral", launchpad: "All", raiseMin: "0", raiseMax: "0" });
    const filterRef = useRef<HTMLDivElement>(null);

    const cards = [
        {
            title: "Total Listed ICOs",
            value: 347,
            valueCls: "text-brand-red",
            // change: "+12% from last month",
            // icon: "/svg/coins/combo.svg",
        },
        {
            title: "Active Users",
            value: 1289,
            // change: "+8% from last month",
            // icon: "/svg/usercombo.svg",
        },
        {
            title: "Approved Projects",
            value: 74,
            // change: "+5% from last month",
            // icon: "/svg/checkcircle.svg",
            // textColor: "brand-yellow",
        },
    ];
    const columns = [
        {
            key: "name", label: "Name",
            className: "text-brand-text-secondary font-inter font-semibold text-[16px] leading-[20px]", // white bold
        },
        { key: "email", label: "Email" },
        {
            key: "role", label: "Role",
            render: (value: string) => (
                <span
                    className={`px-3 py-1 inline-flex items-center gap-2 rounded-full text-sm font-semibold  border border-black
                        text-white 
                       
                        }`}
                >
                    <Shield />{value}
                </span>
            ),

        },
        { key: "joined", label: "Joined" },
        {
            key: "status",
            label: "Status",
            render: (value: string) => {
                console.log({ value })
                return <StatusBadge value={value === "suspended" ? "suspended" : value} text={value} />
            },
        },

        {
            key: "actions",
            label: "Actions",
            render: () => (
                <div className="flex gap-3">
                    <button className="text-gray-300 hover:text-white">
                        <Edit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                        <Ban size={16} />
                    </button>
                </div>
            ),
        },
    ];

    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            role: "User",
            joined: "21 Sep 2024",
            status: "active",

        },
        {
            name: "Alice Smith",
            email: "alice@example.com",
            role: "Moderator",
            joined: "15 Aug 2024",
            status: "active",
        },
        {
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "User",
            joined: "03 Oct 2024",
            status: "suspended",
        },
        {
            name: "Carol Williams",
            email: "carol@example.com",
            role: "Admin",
            joined: "10 Jul 2024",
            status: "suspended",
        },
    ];

    const tokenOptions = [
        { value: "", label: "All Users" },
        { value: "active", label: "Active Users" },
        { value: "suspended", label: "Suspended" },
    ];

    const handleSelect = (value: string, name: string) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilter(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="flex flex-col gap-8  h-screen w-full   ">
            <TopHeader
                pageName="Dashboard Overview"
                pageDescription="Welcome back! Here's what's happening with DailyBlock today."
            >
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="font-inter font-semibold text-sm cursor-pointer leading-[20px] flex items-center justify-center gap-2 px-4 py-2 bg-[#3B3B3B] rounded-xl border border-[#2B2B31]"
                    >
                        <Funnel className="text-sm" /> Filters
                    </button>

                    {/* UniversalContainer Dropdown */}
                    {showFilter && (
                        <UniversalContainer
                            size="lg"
                            className="absolute right-0 mt-2  md:w-[500px]  w-[200px]   p-6 bg-gradient-to-br from-[#121212] to-[#141B1F]
                                      border border-[#364349] rounded-[12px] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px] z-50"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button onClick={() => setShowFilter(false)}>
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            {/* Title */}
                            <h2 className="mt-3 text-[#F8FAFC] font-inter font-semibold text-[18px] leading-[18px] tracking-[-0.45px]">
                                Filter Users
                            </h2>

                            {/* Fields */}
                            <div className="mt-6 space-y-8">
                                <SelectField
                                    label="Status"
                                    name="status"
                                    options={tokenOptions}
                                    placeholder="Select status Level"
                                    value={data.status}
                                    lblClass='text-[14px] font-semibold leading-[14px] font-inter'
                                    onChange={(e) => handleSelect(e, "status")} // ✅ fixed type error
                                />


                            </div>

                            {/* Buttons */}
                            <div className="flex md:justify-end justify-between gap-3 mt-8">
                                <button
                                    className="md:w-[72px] w-full h-[40px] rounded-[10px] border border-[#3B3B3B] cursor-pointer bg-[#3B3B3B] text-[#F8FAFC] text-[14px] font-semibold"
                                    onClick={() => setData({ status: "Neutral", launchpad: "All", raiseMin: "0", raiseMax: "0" })}
                                >
                                    Reset
                                </button>
                                <button
                                    className="md:w-[118px] w-full h-[40px] rounded-[10px] bg-[#FACC15] cursor-pointer text-black text-[14px] font-semibold"
                                    onClick={() => setShowFilter(false)}
                                >
                                    Filter
                                </button>
                            </div>
                        </UniversalContainer>
                    )}
                </div>
            </TopHeader>
            {/* FILTER PANEL */}

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cards.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>

            {/* ✅ Table Section (fixed) */}
            {/* ✅ Responsive Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                    <div className="min-w-full">
                        <DataTable title="User List" columns={columns} data={users} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page