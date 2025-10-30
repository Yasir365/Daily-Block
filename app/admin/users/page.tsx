"use client"; import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import StatusBadge from '@/components/ui/Badge';
import CustomConfirm from '@/components/ui/CustomAlert';
import InputField from '@/components/ui/Input';
import SelectField from '@/components/ui/Select';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { useUsers } from '@/hooks/useUsers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ban, Check, Edit, Funnel, Shield, X } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// ✅ Update user status (activate/deactivate)
const updateUserStatus = async ({
    id,
    action,
}: {
    id: string;
    action: "active" | "inactive";
}) => {
    const res = await fetch(`/api/users/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
    });

    const data = await res.json();
    if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to update user status");
    return data;
};

const page = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [data, setData] = useState({ status: "" });
    const [filters, setFilters] = useState({ status: "" });

    const filterRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();


    const { data: users = [], refetch, isFetching } = useUsers(filters, true);


    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState<{
        open: boolean;
        action: "active" | "inactive" | null;
    }>({ open: false, action: null });


    // ✅ React Query mutation for status update
    // ✅ React Query mutation for status update
    const { mutate: handleStatusChange } = useMutation({
        mutationFn: updateUserStatus,
        onMutate: async ({ id, action }) => {
            await queryClient.cancelQueries({ queryKey: ["users"] });

            const previousUsers = queryClient.getQueryData(["users"]);

            // 🟡 Optimistic UI Update
            queryClient.setQueryData(["users"], (oldUsers: any) => {
                if (!oldUsers) return [];
                return oldUsers.map((u: any) =>
                    u._id === id ? { ...u, status: action } : u
                );
            });

            return { previousUsers };
        },

        onError: (err: any, _variables, context: any) => {
            console.error("Status update error:", err.message);
            // 🔙 Rollback if failed
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
            setShowConfirm({ open: false, action: null });
        },

        onSettled: () => {
            // ✅ Ensure fresh data after mutation (optional if optimistic update is used)
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setShowConfirm({ open: false, action: null });
        },
    });

    console.log({ users })
    const cards = [
        { title: "Total Users", value: users.length },
        { title: "Active Users", value: users.filter((u: any) => u.status === "active").length },
        { title: "Suspended Users", value: users.filter((u: any) => u.status === "suspended").length },
    ];
    const columns = [
        {
            key: "name", label: "Name",
            className: "text-brand-text-secondary font-inter font-semibold text-[16px] leading-[20px]", // white bold
            render: (_: any, row: any) => {
                // ✅ Handle cases where userId might be null or not populated


                const fullName =
                    [row.firstName, row.lastName].filter(Boolean).join(" ") || row.email;

                return (
                    <span className="font-inter text-sm text-white capitalize">
                        {fullName}
                    </span>
                );
            },
        },
        { key: "email", label: "Email" },
        {
            key: "userType", label: "Role",
            render: (value: string) => (
                <span
                    className={`px-3 py-1 inline-flex items-center gap-2 rounded-full text-sm font-semibold  border border-black capitalize
                        text-white 
                       
                        }`}
                >
                    <Shield />{value}
                </span>
            ),

        },
        {
            key: "createdAt", label: "Joined",
            render: (value: string) => {
                const date = new Date(value);

                const formattedDate = date.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",

                });
                return (
                    <span
                        className={`
                        text-white 
                       
                        }`}
                    >
                        {formattedDate}
                    </span>
                )
            }
        },
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
            render: (_: any, row: any) => (
                <div className="flex gap-3 items-center">
                    <button className="text-gray-300 hover:text-white cursor-pointer">
                        <Edit size={16} />
                    </button>
                    {row.status === "inactive" ? (
                        <button
                            onClick={() => {
                                setSelectedUserId(row._id);
                                setShowConfirm({ open: true, action: "active" });
                            }}
                            className="text-green-400 hover:text-green-300 cursor-pointer"
                        >
                            <Check size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setSelectedUserId(row._id);
                                setShowConfirm({ open: true, action: "inactive" });
                            }}
                            className="text-red-500 hover:text-red-400 cursor-pointer"
                        >
                            <Ban size={16} />
                        </button>
                    )}
                </div>
            ),
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
                                    placeholder="Select Status"
                                    value={data.status}
                                    onChange={(val) => handleSelect(val, "status")}
                                />


                            </div>

                            {/* Buttons */}
                            <div className="flex md:justify-end justify-between gap-3 mt-8">
                                <button
                                    className="md:w-[72px] w-full h-[40px] rounded-[10px] border border-[#3B3B3B] cursor-pointer bg-[#3B3B3B] text-[#F8FAFC] text-[14px] font-semibold"
                                    onClick={() => setData({ status: "all" })}
                                >
                                    Reset
                                </button>
                                <button
                                    className="md:w-[118px] w-full h-[40px] rounded-[10px] bg-[#FACC15] cursor-pointer text-black text-[14px] font-semibold"
                                    onClick={() => {
                                        setFilters(data);
                                        refetch();
                                        setShowFilter(false);
                                    }}
                                >
                                    {isFetching ? "Filtering..." : "Filter"}

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
            {/* ✅ Confirm Modal */}
            <CustomConfirm
                open={showConfirm.open}
                title={
                    showConfirm.action === "active"
                        ? "Activate User"
                        : "Deactivate User"
                }
                message={
                    showConfirm.action === "active"
                        ? "Are you sure you want to activate this user?"
                        : "Are you sure you want to suspend this user?"
                }
                onConfirm={() => {
                    if (selectedUserId && showConfirm.action) {
                        handleStatusChange({ id: selectedUserId, action: showConfirm.action });
                    }
                }}
                onCancel={() => setShowConfirm({ open: false, action: null })}
            />
        </div>
    )
}

export default page