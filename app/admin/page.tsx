"use client";
import WeeklyGrowthChart from '@/components/admin/charts/WeeklyGrowthChart';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { TopHeader } from '@/components/admin/TopHeader'
import { fetchDashboardStats } from '@/services/dashboardService';
import { fetchNotifications } from '@/services/notificationService';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import React from 'react'

const page = () => {
    const {
        data: stats,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardStats,
    });
    const { data: latestNotifications } = useQuery({
        queryKey: ["notifications", "latest"],
        queryFn: () => fetchNotifications({ mode: "all", limit: 3 }),
    });

    const cards = [
        {
            title: "Total Listed ICOs",
            value: stats?.summary?.icoProjects?.total ?? 0,
            change: `Pending: ${stats?.summary?.icoProjects?.pending ?? 0}, Draft: ${stats?.summary?.icoProjects?.draft ?? 0}`,
            icon: "/svg/coins/combo.svg",
        },
        {
            title: "Active Users",
            value: stats?.summary?.users?.active ?? 0,
            change: `Inactive: ${stats?.summary?.users?.inactive ?? 0}`,
            icon: "/svg/usercombo.svg",
        },
        {
            title: "Approved Projects",
            value: stats?.summary?.icoProjects?.approved ?? 0,
            change: `Rejected: ${stats?.summary?.icoProjects?.rejected ?? 0}`,
            icon: "/svg/checkcircle.svg",
            textColor: "brand-yellow",
        },
    ];
    const activities =
        latestNotifications?.data?.map((item: any) => {
            const isBlog = item.type === "blog";
            const related = item.relatedId || item.relatedData || {};

            return {
                id: item._id,
                title: item.title || (isBlog ? "New Blog Published" : "New Notification"),
                project: related?.title || item.message,
                status: item.isRead ? "Read" : "Unread",
                time: new Date(item.createdAt).toLocaleString(),
                dotColor: item.isRead ? "bg-gray-400" : "bg-brand-yellow",
                bgColor: item.isRead ? "bg-gray-200" : "bg-brand-yellow",
                borderColor: item.isRead ? "border-gray-300" : "border-brand-yellow",
                textColor: item.isRead ? "text-gray-600" : "text-black",
                image: related?.image || "/svg/coins/combo.svg", // optional image
            };
        }) || [];

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