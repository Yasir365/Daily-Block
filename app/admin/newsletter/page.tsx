"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import { Ban, Check, Download, Edit, Eye, Funnel, Mail, MessageSquare, Search, Shield, X } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const page = () => {
    const cards = [
        {
            title: "Total Listed ICOs",
            value: 347,
            valueCls: "text-brand-red",
            change: "+12% from last month",
            height: "200px"
            // icon: "/svg/coins/combo.svg",
        },
        {
            title: "Active Users",
            value: 1289,
            change: "+8% from last month", height: "200px"
            // icon: "/svg/usercombo.svg",
        },
        {
            title: "Approved Projects",
            value: 74,
            change: "+5% from last month",
            height: "200px"
            // icon: "/svg/checkcircle.svg",
            // textColor: "brand-yellow",
        },
    ];
    const columns = [
        {
            key: "email", label: "email",
            className: "text-white font-inter font-semibold text-[16px] leading-[20px]", // white bold
            render: (prop: string) => (
                <span className="font-inter font-semibold text-sm leading-[20px] flex items-center gap-2">
                    <Mail size={14} className='text-[#94A3B8]' /> {prop}
                </span>
            ),
        },
        {
            key: "token", label: "token",
            render: (value: string) => {
                console.log({ value })
                return <StatusBadge value={"coin"} text={value} />
            },
        },
        { key: "registered", label: "registered" },

        {
            key: "status",
            label: "Status",
            render: (value: string) => {
                console.log({ value })
                return <StatusBadge value={value === "active" ? "active_success" : value} text={value} />
            },
        },

        {
            key: "actions",
            label: "Actions",
            render: () => (
                <span className="font-inter font-semibold text-sm leading-[20px] flex items-center cursor-pointer">
                    View Details
                </span>
            ),
        },
    ];

    const users = [
        {
            email: "john@example.com",
            token: "Btc",
            registered: "21 Sep 2024",
            status: "active",

        },
        {
            email: "john@example.com",
            token: "Btc",
            registered: "21 Sep 2024",
            status: "active",

        },
        {
            email: "john@example.com",
            token: "Btc",
            registered: "21 Sep 2024",
            status: "active",

        },

    ];
    return (
        <div className="flex flex-col gap-8  w-full   ">
            <TopHeader
                pageName="ICO Management"
                pageDescription="Review, approve, or reject ICO submissions"
            >
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
                        <DataTable title="Subscribers" desc="View and manage your email subscribers" columns={columns} data={users} >
                            {/* Search Bar */}
                            <div className='flex gap-2 items-center'>

                                <div className="relative w-full min-w-[200px] md:min-w-[300px] max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Search Subscribers..."
                                        className="w-full p-3 pl-10 bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                                    />
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>
                                <span
                                    className="w-fit p-3  bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"

                                ><Download />
                                </span>
                            </div>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page