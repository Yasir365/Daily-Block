"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataList from '@/components/admin/list/DataList';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import InputField from '@/components/ui/Input';
import SelectField from '@/components/ui/Select';
import Teextarea from '@/components/ui/Textarea';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { Ban, Check, Download, Edit, Eye, Funnel, Mail, MessageSquare, Plus, Search, Shield, X } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BtnComp } from '../faqs/page';

const page = () => {
    const cards = [
        {
            title: "Total Posts",
            value: 1289,
            change: "+12% from last month",
            height: "200px"
            // icon: "/svg/coins/combo.svg",
        },
        {
            title: "Total Views",
            value: 1289,
            change: "+12% from last month",
            height: "200px"
            // icon: "/svg/coins/combo.svg",
        },
        {
            title: "Avg. Read Time",
            value: "4.2 min",
            change: "+12% from last month",
            height: "200px"
            // icon: "/svg/coins/combo.svg",
        },
    ];
    const data = [
        {
            title: "Top 10 ICO Projects to Watch in 2024",
            desc: "Discover the most promising initial coin offerings launching this year...",
            date: "2024-01-15",
            views: "123",
            status: "published",

        },
        {
            title: "Top 10 ICO Projects to Watch in 2024",
            desc: "Discover the most promising initial coin offerings launching this year...",
            date: "2024-01-15",
            views: "123",
            status: "published",

        },

    ];

    const [showFilter, setShowFilter] = useState(false);
    const [data2, setData] = useState({ status: "Neutral", content: "", title: "", excerpt: "" });
    const filterRef = useRef<HTMLDivElement>(null);
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
    const tokenOptions = [
        { value: "Neutral", label: "Neutral" },
        { value: "High", label: "High" },
        { value: "Low", label: "Low" },
    ];
    return (
        <div className="flex flex-col gap-8  w-full   ">
            <TopHeader
                pageName="Blog Management"
                pageDescription="Review, approve, or reject ICO submissions"
            >
                <div className="relative" ref={filterRef}>
                    <BtnComp title="Create New Post" onClick={() => setShowFilter(!showFilter)} />


                    {/* UniversalContainer Dropdown */}
                    {showFilter && (
                        <UniversalContainer
                            size="lg"
                            as='div'
                            className="absolute right-0 mt-2 w-[896px] max-w-[896px] p-6 bg-gradient-to-br from-[#121212] to-[#141B1F]
                                      border border-[#364349] rounded-[12px] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px] z-50"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button onClick={() => setShowFilter(false)}>
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            {/* Title */}
                            <span className='mt-3 flex flex-col gap-1'>

                                <h2 className=" text-[#F8FAFC] font-inter font-semibold text-[18px] leading-[18px] tracking-[-0.45px]">
                                    Create New Blog Post
                                </h2>
                                <p className="font-inter font-normal text-[14px] leading-[20px] align-middle text-slate-400">
                                    Write a new blog post for your audience
                                </p>
                            </span>

                            {/* Fields */}
                            <div className="mt-6 space-y-8">
                                <InputField
                                    label="Title"
                                    name="title"
                                    value={data2.title}
                                    inputClass="!bg-[#0D0E12] !rounded-md placeholder-gray-400"
                                    onChange={(e) => handleSelect(e.target.value, "title")}
                                    placeholder="Enter Blog Post Title"
                                // iconPlace="right"

                                />
                                <Teextarea
                                    label="Excerpt"
                                    name="excerpt"
                                    cls="!bg-[#0D0E12]"
                                    placeholder="Brief description..."
                                    value={data2.excerpt || ""}
                                    onChange={(e) => handleSelect(e.target.value, "excerpt")}
                                    rows={4}
                                />
                                <Teextarea
                                    label="Content"
                                    name="content"
                                    cls="!bg-[#0D0E12]"
                                    placeholder="Brief description content..."
                                    value={data2.content || ""}
                                    onChange={(e) => handleSelect(e.target.value, "content")}
                                    rows={8}
                                />
                                <SelectField
                                    btnClass="!bg-[#0D0E12] "
                                    label="Status"
                                    name="status"
                                    options={tokenOptions}
                                    placeholder="Select status Level"
                                    value={data2.status}
                                    lblClass='text-[14px] font-semibold leading-[14px] font-inter'
                                    onChange={(e) => handleSelect(e, "status")} // ✅ fixed type error
                                />


                            </div>

                            {/* Buttons */}
                            <div className="flex w-full gap-2 mt-8">
                                <button
                                    className="w-full h-[40px] rounded-[10px] bg-[#FACC15] cursor-pointer text-black text-[14px] font-semibold"
                                    onClick={() => setShowFilter(false)}
                                >
                                    Create Post
                                </button>
                                <button
                                    className="w-full h-[40px] rounded-[10px] border border-[#3B3B3B] cursor-pointer bg-[#0D0E12] text-[#F8FAFC] text-[14px] font-semibold"
                                    onClick={() => setData({ status: "Neutral", title: "", excerpt: "", content: "" })}
                                >
                                    Cancel
                                </button>

                            </div>
                        </UniversalContainer>
                    )}
                </div>
            </TopHeader>

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
                        <DataList title="All Blog Posts" desc="View and manage your published and draft articles" data={data} >
                            {/* Search Bar */}
                            <div className='flex gap-2 items-center'>

                                <div className="relative w-full min-w-[200px] md:min-w-[300px] max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Search Posts..."
                                        className="w-full p-3 pl-10 bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                                    />
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                            </div>
                        </DataList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page