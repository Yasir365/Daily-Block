"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import { fetchDashboardStats } from '@/services/dashboardService';
import { fetchSubscribers, updateSubscriberStatus } from '@/services/newsletterService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ban, Check, Download, Edit, Eye, Funnel, Mail, MessageSquare, Search, Shield, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { debounce } from 'lodash'; // npm i lodash (if not installed)
const page = () => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
    // ✅ Debounced search (optional: wait 300ms after typing stops)
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set('search', value);
            } else {
                params.delete('search');
            }
            router.replace(`?${params.toString()}`, { scroll: false });
        }, 300),
        [searchParams, router]
    );
    const {
        data: stats,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardStats,
    });

    // Fetch subscribers
    const { data: subscribers = [], isLoading: isSubscribersLoading } = useQuery({
        queryKey: ["subscribers", localSearch],
        queryFn: () => fetchSubscribers(localSearch),
    });
    const cards = [
        {
            title: "Total Listed ICOs",
            value: stats?.totalListedIcos?.count ?? 0,
            valueCls: "text-brand-red",
            // change: "+12% from last month",
            change: `${stats?.totalListedIcos?.change ?? 0}% from last month`,
            height: "200px"
            // icon: "/svg/coins/combo.svg",
        },
        {
            title: "Active Users",
            value: stats?.activeUsers?.count ?? 0,
            change: `${stats?.activeUsers?.change ?? 0}% from last month`,
            height: "200px"
            // icon: "/svg/usercombo.svg",
        },
        {
            title: "Approved Projects",
            value: stats?.approvedProjects?.count ?? 0,
            change: `${stats?.approvedProjects?.change ?? 0}% from last month`,
            height: "200px"
            // icon: "/svg/checkcircle.svg",
            // textColor: "brand-yellow",
        },
    ];
    const columns = [
        {
            key: "email",
            label: "Email",
            className: "text-white font-inter font-semibold text-[16px] leading-[20px]",
            render: (email: string) => (
                <span className="font-inter font-semibold text-sm leading-[20px] flex items-center gap-2">
                    <Mail size={14} className="text-[#94A3B8]" /> {email}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (status: "active" | "blocked") => (
                <StatusBadge value={status === "active" ? "active_success" : "suspended"} text={status} />
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            key: "actions",
            label: "Actions",
            render: (_: any, row: any) => (
                <div className="flex gap-2">
                    {row.status === "active" ? (
                        <span
                            className="cursor-pointer p-1 rounded-full bg-brand-red hover:bg-brand-red/60 transition"
                            title="Block Subscriber"
                            onClick={() => handleStatusToggle(row._id, "active")}
                        >
                            <X size={16} className="text-white" />
                        </span>
                    ) : (
                        <span
                            className="cursor-pointer p-1 rounded-full bg-brand-green/40 hover:bg-brand-green/60 transition"
                            title="Activate Subscriber"
                            onClick={() => handleStatusToggle(row._id, "blocked")}
                        >
                            <Check size={16} className="text-white" />
                        </span>
                    )}
                </div>
            ),
        },
    ];

    // Mutation to update subscriber status
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: "active" | "blocked" }) =>
            updateSubscriberStatus(id, status),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscribers"] }),
    });

    const handleStatusToggle = (id: string, currentStatus: "active" | "blocked") => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        updateStatusMutation.mutate({ id, status: newStatus });
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearch(value);
        debouncedSearch(value);
    };
    return (
        <div className="flex flex-col gap-8  w-full   " >
            <TopHeader
                pageName="ICO Management"
                pageDescription="Review, approve, or reject ICO submissions"
            >
            </TopHeader>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" >
                {
                    cards.map((card, index) => (
                        <DashboardCard key={index} {...card} />
                    ))
                }
            </div >

            {/* ✅ Table Section (fixed) */}
            {/* ✅ Responsive Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                    <div className="min-w-full">
                        <DataTable title="Subscribers" desc="View and manage your email subscribers" columns={columns} data={subscribers} >
                            {/* Search Bar */}
                            <div className='flex gap-2 items-center'>

                                <div className="relative w-full min-w-[200px] md:min-w-[300px] max-w-xs">
                                    <input
                                        type="text"
                                        value={localSearch}
                                        onChange={handleSearchChange}
                                        placeholder="Search Subscribers..."
                                        className="w-full p-3 pl-10 bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                                    />
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>
                                {/* <span
                                    className="w-fit p-3  bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"

                                ><Download />
                                </span> */}
                            </div>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page