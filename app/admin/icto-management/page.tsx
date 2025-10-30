"use client";
import { DashboardCard } from '@/components/admin/DashboardCard';
import DataTable from '@/components/admin/table/DataTable';
import { TopHeader } from '@/components/admin/TopHeader'
import ChatSideBar from '@/components/ui/ChatSideBar';
import CustomConfirm from '@/components/ui/CustomAlert';
import InputField from '@/components/ui/Input';
import SelectField from '@/components/ui/Select';
import StatusBadge from '@/components/ui/StatusBadge';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Eye, Funnel, MessageSquare, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

// 🔥 Fetch Projects Service
// 🔥 Fetch Projects Service
const fetchIcos = async (filters: {
    status?: string;
    launchpad?: string;
    raiseMin?: string;
    raiseMax?: string;
}) => {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.launchpad) queryParams.append("launchpad", filters.launchpad);
    if (filters.raiseMin) queryParams.append("raiseMin", filters.raiseMin);
    if (filters.raiseMax) queryParams.append("raiseMax", filters.raiseMax);

    const res = await fetch(`/api/ico/list?${queryParams.toString()}`, {
        cache: "no-store",
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch ICOs");
    return data.data;
};

// 🔥 Delete Project Service
const deleteIco = async (id: string) => {
    const res = await fetch(`/api/ico/list?id=${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to delete ICO");
    return data;
};
// ✅ Update approveIco to send JSON body
const approveIco = async ({
    id,
    action = "approved",
}: {
    id: string;
    action?: "approved" | "rejected";
}) => {
    const res = await fetch(`/api/ico/approve`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }), // ✅ send as JSON
        cache: "no-store",
    });

    let data;
    try {
        data = await res.json();
    } catch (err) {
        throw new Error("Invalid response from server");
    }

    if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update ICO status");
    }

    return data;
};


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
            key: "cryptoCoinName", label: "project",
            className: "text-brand-text-secondary font-inter font-semibold text-[16px] leading-[20px]", // white bold
        },
        {
            key: "owner",
            label: "Owner",
            render: (_: any, row: any) => {
                // ✅ Handle cases where userId might be null or not populated
                const user = row.userId;
                if (!user) return "N/A";

                const fullName =
                    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

                return (
                    <span className="font-inter text-sm text-white">
                        {fullName}
                    </span>
                );
            },
        },
        { key: "launchpad", label: "launchpad" },

        {
            key: "status",
            label: "Status",
            render: (value: string) => {
                return <StatusBadge status={value} />
            },
        },
        {
            key: "discussion",
            label: "discussion",
            render: (value: string, row: any) => {
                return (
                    <span
                        onClick={() => { setChatOpenId(row); setChatOpen(true) }}
                        className="group relative inline-flex items-center gap-4 rounded-xl bg-[#484C4F] py-2 px-4 font-lato text-sm font-semibold text-[#F1F4F4] cursor-pointer transition hover:bg-[#5A5F62]"
                        style={{ zIndex: 10 }}
                    >
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-black text-xs font-bold pointer-events-none">
                            2
                        </span>
                        <MessageSquare className="transition-transform group-hover:scale-110" />
                        Discuss
                    </span>

                )
            },
        },

        {
            key: "actions",
            label: "Actions",
            render: (_: any, row: any) => (
                <div className="flex gap-4 ">
                    {/* View */}
                    <button className="text-gray-300 hover:text-white cursor-pointer"

                    >
                        <Eye size={16} />
                    </button>

                    {/* Approve (you can handle separately later) */}
                    <button
                        className="text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => {
                            setSelectedApproveId(row._id);
                            setShowApproveConfirm({ open: true, action: "approved" });
                        }}
                    >
                        <Check size={16} className="text-brand-green" />
                    </button >

                    {/* Delete */}
                    <button
                        onClick={() => {
                            setSelectedApproveId(row._id);
                            setShowApproveConfirm({ open: true, action: "rejected" });
                        }}
                        className="text-red-500 hover:text-red-400 cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div >
            ),
        },
    ];

    // const users = [
    //     {
    //         project: "John Doe",
    //         owner: "john@example.com",
    //         launchpad: "User",
    //         joined: "21 Sep 2024",
    //         status: "active",
    //         discussion: "3",

    //     },
    //     {
    //         name: "Alice Smith",
    //         email: "alice@example.com",
    //         role: "Moderator",
    //         joined: "15 Aug 2024",
    //         status: "active",
    //     },
    //     {
    //         name: "Bob Johnson",
    //         email: "bob@example.com",
    //         role: "User",
    //         joined: "03 Oct 2024",
    //         status: "suspended",
    //     },
    //     {
    //         name: "Carol Williams",
    //         email: "carol@example.com",
    //         role: "Admin",
    //         joined: "10 Jul 2024",
    //         status: "suspended",
    //     },
    //     {
    //         project: "John Doe",
    //         owner: "john@example.com",
    //         launchpad: "User",
    //         joined: "21 Sep 2024",
    //         status: "active",
    //         discussion: "3",

    //     },
    //     {
    //         name: "Alice Smith",
    //         email: "alice@example.com",
    //         role: "Moderator",
    //         joined: "15 Aug 2024",
    //         status: "active",
    //     },
    //     {
    //         name: "Bob Johnson",
    //         email: "bob@example.com",
    //         role: "User",
    //         joined: "03 Oct 2024",
    //         status: "suspended",
    //     },
    //     {
    //         name: "Carol Williams",
    //         email: "carol@example.com",
    //         role: "Admin",
    //         joined: "10 Jul 2024",
    //         status: "suspended",
    //     },
    //     {
    //         project: "John Doe",
    //         owner: "john@example.com",
    //         launchpad: "User",
    //         joined: "21 Sep 2024",
    //         status: "active",
    //         discussion: "3",

    //     },
    //     {
    //         name: "Alice Smith",
    //         email: "alice@example.com",
    //         role: "Moderator",
    //         joined: "15 Aug 2024",
    //         status: "active",
    //     },
    //     {
    //         name: "Bob Johnson",
    //         email: "bob@example.com",
    //         role: "User",
    //         joined: "03 Oct 2024",
    //         status: "suspended",
    //     },
    //     {
    //         name: "Carol Williams",
    //         email: "carol@example.com",
    //         role: "Admin",
    //         joined: "10 Jul 2024",
    //         status: "suspended",
    //     },
    // ];
    const [showFilter, setShowFilter] = useState(false);
    const [data, setData] = useState({ status: "all", launchpad: "all", raiseMin: "0", raiseMax: "0" });
    const [filters, setFilters] = useState({
        status: "all",
        launchpad: "all",
        raiseMin: "0",
        raiseMax: "0",
    });

    const filterRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const [status, setStatus] = useState("");
    const [chatOpen, setChatOpen] = useState(false);
    const [chatOpenId, setChatOpenId] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null); // ✅ Track which ICO to delete
    const [showConfirm, setShowConfirm] = useState(false);
    const [showApproveConfirm, setShowApproveConfirm] = useState<{ open: boolean; action: "approved" | "rejected" | null }>({
        open: false,
        action: null,
    });
    const [selectedApproveId, setSelectedApproveId] = useState<string | null>(null);



    // ✅ Fetch all ICOs
    const {
        data: projects = [],
        isLoading,
        isError,
        refetch, // ✅ add this
    } = useQuery({
        queryKey: ["icoList", filters], // depends on full filter data
        queryFn: () => fetchIcos(data),
    });

    // ✅ UseMutation typed properly
    const { mutate: handleApprove } = useMutation({
        mutationFn: approveIco,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["icoList", data] }); // use the same `data` object as filters
            setShowApproveConfirm({ open: false, action: null });
        },
        onError: (error: any) => {
            console.error("Approve Error:", error.message);
            setShowApproveConfirm({ open: false, action: null });
        },
    });

    // ✅ Delete Mutation
    const { mutate: handleDelete } = useMutation({
        mutationFn: deleteIco,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["icoList"] }); // ✅ invalidates all
            setShowConfirm(false);

        },
        onError: (error: any) => {
            // toast.error(error.message || "Failed to delete ICO");
        },
    });
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
        { value: "all", label: "All" },
        { value: "Neutral", label: "Neutral" },
        { value: "High", label: "High" },
        { value: "Low", label: "Low" },
    ];
    //   status: "draft" | "pending" | "approved" | "rejected";

    const statusOptions = [
        { value: "all", label: "All" },
        { value: "draft", label: "Draft" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
    ];

    return (
        <div className="flex flex-col gap-8  w-full   ">
            <TopHeader
                pageName="Newsletter Management"
                pageDescription="Manage your email subscribers and token registrations"
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
                            className="absolute right-0 mt-2  w-[200px] md:w-[500px]  p-6 bg-gradient-to-br from-[#121212] to-[#141B1F]
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
                                Filter ICO Submissions
                            </h2>

                            {/* Fields */}
                            <div className="mt-6 space-y-8">
                                <SelectField
                                    label="Status"
                                    name="status"
                                    options={statusOptions}
                                    placeholder="Select status Level"
                                    value={data.status}
                                    lblClass='text-[14px] font-semibold leading-[14px] font-inter'
                                    onChange={(e) => handleSelect(e, "status")} // ✅ fixed type error
                                />
                                <SelectField
                                    label="Launch Pad"
                                    name="launchpad"
                                    options={tokenOptions}
                                    placeholder="Select Launch Pad Level"
                                    value={data.launchpad}
                                    lblClass='text-[14px] font-semibold leading-[14px] font-inter'
                                    onChange={(value) => handleSelect(value, "launchpad")}  // ✅ Correct: `value` is a string
                                />
                                <span className='grid grid-cols-2 gap-1 items-center'>

                                    <InputField
                                        label="Total Raise Amount"
                                        name="raiseMin"
                                        value={data.raiseMin}
                                        onChange={(e) => handleSelect(e.target.value, "raiseMin")}
                                        placeholder="Enter Max Raise Amount"
                                        iconPlace="right"
                                        icon={
                                            <div className="flex flex-col gap-1">
                                                {/* Increase Button */}
                                                <Image
                                                    src="/svg/numArrow.svg"
                                                    alt="Increase"
                                                    width={16}
                                                    height={16}
                                                    className="cursor-pointer hover:opacity-80 transition"
                                                    onClick={() =>
                                                        handleSelect(String((Number(data.raiseMin) || 0) + 1), "raiseMin")
                                                    }
                                                />
                                                {/* Decrease Button */}
                                                <Image
                                                    src="/svg/numArrow.svg"
                                                    alt="Decrease"
                                                    width={16}
                                                    height={16}
                                                    className="cursor-pointer hover:opacity-80 transition rotate-180"
                                                    onClick={() =>
                                                        handleSelect(
                                                            String(Math.max((Number(data.raiseMin) || 0) - 1, 0)), // prevents going below 0
                                                            "raiseMin"
                                                        )
                                                    }
                                                />
                                            </div>
                                        }
                                    />
                                    {/* Right Input (Max) with "to" centered */}
                                    <div className="flex items-center gap-2">
                                        {/* Centered "to" text */}
                                        <span className="text-gray-400 text-sm flex items-center justify-center h-full translate-y-[2px]">
                                            to
                                        </span>

                                        {/* Input Field */}
                                        <div className="flex-1">
                                            <InputField
                                                label="" // keeps consistent height even without label
                                                name="raiseMax"
                                                value={data.raiseMax}
                                                onChange={(e) => handleSelect(e.target.value, "raiseMax")}
                                                placeholder="Enter Max Raise Amount"
                                                iconPlace="right"
                                                icon={
                                                    <div className="flex flex-col gap-1">
                                                        {/* Increase Button */}
                                                        <Image
                                                            src="/svg/numArrow.svg"
                                                            alt="Increase"
                                                            width={16}
                                                            height={16}
                                                            className="cursor-pointer hover:opacity-80 transition"
                                                            onClick={() =>
                                                                handleSelect(String((Number(data.raiseMax) || 0) + 1), "raiseMax")
                                                            }
                                                        />
                                                        {/* Decrease Button */}
                                                        <Image
                                                            src="/svg/numArrow.svg"
                                                            alt="Decrease"
                                                            width={16}
                                                            height={16}
                                                            className="cursor-pointer hover:opacity-80 transition rotate-180"
                                                            onClick={() =>
                                                                handleSelect(
                                                                    String(Math.max((Number(data.raiseMax) || 0) - 1, 0)),
                                                                    "raiseMax"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>


                                </span>

                            </div>

                            {/* Buttons */}
                            <div className="flex sm:justify-between md:justify-end gap-3 mt-8">
                                <button
                                    className="w-full md:w-[72px] h-[40px] rounded-[10px] border border-[#3B3B3B] cursor-pointer bg-[#3B3B3B] text-[#F8FAFC] text-[14px] font-semibold"
                                    onClick={() => setData({ status: "Neutral", launchpad: "All", raiseMin: "0", raiseMax: "0" })}
                                >
                                    Reset
                                </button>
                                <button
                                    className="w-full md:w-[118px] h-[40px] rounded-[10px] bg-[#FACC15] cursor-pointer text-black text-[14px] font-semibold"
                                    onClick={() => {
                                        setFilters(data); // ✅ apply selected filters

                                        refetch(); // trigger API with new filters
                                        setShowFilter(false);
                                    }}
                                >
                                    Filter
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
                        <DataTable title="Submissions" columns={columns} data={projects} />
                    </div>
                </div>
            </div>
            <ChatSideBar open={chatOpen} setOpen={setChatOpen} chatId={chatOpenId} setChatId={setChatOpenId} />
            {/* ✅ Confirm Delete Modal */}

            <CustomConfirm
                open={showApproveConfirm.open}
                title={showApproveConfirm.action === "approved" ? "Approve Confirmation" : "Reject Confirmation"}
                message={
                    showApproveConfirm.action === "approved"
                        ? "Are you sure you want to approve this ICO project?"
                        : "Are you sure you want to reject this ICO project?"
                }
                onConfirm={() => {
                    if (selectedApproveId && showApproveConfirm.action) {
                        handleApprove({ id: selectedApproveId, action: showApproveConfirm.action });
                    }
                    setShowApproveConfirm({ open: false, action: null });
                }}
                onCancel={() => setShowApproveConfirm({ open: false, action: null })}
            />
        </div>
    )
}

export default page