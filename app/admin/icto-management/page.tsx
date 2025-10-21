"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import { Ban, Edit, Shield } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const page = () => {
    const cards = [
        {
            title: "Total Listed ICOs",
            value: 347,
            change: "+12% from last month",
            icon: "/svg/coins/combo.svg",
        },
        {
            title: "Active Users",
            value: 1289,
            change: "+8% from last month",
            icon: "/svg/usercombo.svg",
        },
        {
            title: "Approved Projects",
            value: 74,
            change: "+5% from last month",
            icon: "/svg/checkcircle.svg",
            textColor: "brand-yellow",
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
            render: (value: string) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${value === "active"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-500 text-white"
                        }`}
                >
                    {value}
                </span>
            ),
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
        <div className="p-3 sm:p-4 lg:p-6 flex flex-col gap-8">
            <TopHeader
                pageName="Dashboard Overview"
                pageDescription="Welcome back! Here's what's happening with DailyBlock today."
            />

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cards.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>

            {/* ✅ Responsive Table Section */}
            <section className="overflow-x-auto w-full rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                <div className="min-w-[700px]">
                    <DataTable title="User List" columns={columns} data={users} />
                </div>
            </section>
        </div>
    )
}

export default page