"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import { Ban, Edit, Funnel, Shield } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const page = () => {
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
    return (
        <div className="flex flex-col gap-8  h-screen w-full   ">
            <TopHeader
                pageName="Dashboard Overview"
                pageDescription="Welcome back! Here's what's happening with DailyBlock today."
            ><button className='font-inter font-semibold text-sm cursor-pointer leading-[20px] flex items-center justify-center gap-2 px-4 py-2 bg-[#3B3B3B] rounded-xl border border-[#2B2B31]'>
                    <Funnel className='text-sm' />   Filters
                </button>

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
                        <DataTable title="User List" columns={columns} data={users} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page