import WeeklyGrowthChart from '@/components/admin/charts/WeeklyGrowthChart';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { TopHeader } from '@/components/admin/TopHeader'
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
    const activities = [
        {
            id: 1,
            title: "New ICO submission",
            project: "MetaVerse Pro",
            status: "Success",
            time: "5 minutes ago",
            dotColor: "bg-brand-yellow",
            bgColor: "bg-brand-yellow",
            borderColor: "border-brand-yellow",
            textColor: "text-black",
        },
        {
            id: 2,
            title: "Project Approved",
            project: "CryptoWorld DAO",
            status: "Warning",
            time: "12 minutes ago",
            dotColor: "bg-brand-green",
            bgColor: "bg-brand-green",
            borderColor: "border-brand-green",
            textColor: "text-white",
        },
        {
            id: 3,
            title: "Project Approved",
            project: "CryptoWorld DAO",
            status: "Warning",
            time: "12 minutes ago",
            dotColor: "bg-brand-green",
            bgColor: "bg-brand-green",
            borderColor: "border-brand-green",
            textColor: "text-white",
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[65%_35%]">
                <WeeklyGrowthChart />
                <RecentActivity activities={activities} />

            </div>
        </div>
    )
}

export default page