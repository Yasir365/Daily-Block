"use client";
import { DashboardCard } from "@/components/admin/DashboardCard";
import DataList from "@/components/admin/list/DataList";
import { TopHeader } from "@/components/admin/TopHeader";
import { BtnComp } from "../faqs/page";
import CreateBlogForm from "@/components/blogs/CreateBlogForm";
import { useDeleteBlog, useFetchBlogs } from "@/hooks/useblog";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CustomToast } from "@/components/ui/ReactToast";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [inputValue, setInputValue] = useState(""); // live input value

    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const { data = [], isLoading, refetch } = useFetchBlogs("all", search);
    const { mutate: deleteBlog } = useDeleteBlog();
    const blogs = data.data || [];

    // ✅ Debounce logic: only set "search" after 400ms of no typing
    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearch(value);
            }, 400),
        []
    );
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSearch(value);
    };
    const handleDelete = (id: string) => {
        deleteBlog(id, {
            onSuccess: () => {
                toast.custom((t) => (
                    <CustomToast
                        t={t}
                        status="Success"
                        message="Blog deleted successfully"
                    />
                ))
                queryClient.invalidateQueries({ queryKey: ["notifications", "latest"] });

                refetch();
            },
            onError: (err: any) => toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message={err.message || "Blog deleted successfully"}
                />
            )),
        });
    };

    const handleEdit = (blog: any) => {
        setSelectedBlog(blog);
        setMode("edit");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBlog(null);
        setMode("create");
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <TopHeader
                pageName="Blog Management"
                pageDescription="Review, approve, or reject ICO submissions"
            >
                <div className="relative" ref={filterRef}>
                    <BtnComp title="Create New Post" onClick={() => setShowModal(true)} />
                    {showModal && (
                        <CreateBlogForm
                            onClose={handleCloseModal}
                            onSuccess={() => {
                                refetch();
                                queryClient.invalidateQueries({ queryKey: ["notifications", "latest"] });

                                setShowModal(false);
                            }}
                            mode={mode}
                            initialData={selectedBlog}
                        />
                    )}
                </div>
            </TopHeader>

            {/* ✅ Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    {
                        title: "Total Posts",
                        value: data?.stats?.totalBlogs ?? 0,
                        change: `${data?.stats?.change?.blogs >= 0 ? "+" : ""}${data?.stats?.change?.blogs || 0}% from last month`,
                    },
                    {
                        title: "Total Views",
                        value: data?.stats?.totalViews ?? 0,
                        change: `${data?.stats?.change?.views >= 0 ? "+" : ""}${data?.stats?.change?.views || 0}% from last month`,
                    },
                    {
                        title: "Avg. Read Time",
                        value: `${data?.stats?.avgReadTime?.toFixed?.(1) || 0} min`,
                        change: `${data?.stats?.change?.readTime >= 0 ? "+" : ""}${data?.stats?.change?.readTime || 0}% from last month`,
                    },
                ].map((card, i) => (
                    <DashboardCard key={i} {...card} />
                ))}
            </div>



            {/* ✅ Table Section */}
            <div className="grid grid-cols-1 gap-4">

                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow backdrop-blur-[4px]">
                    <div className="min-w-full">
                        {isLoading && (
                            <div className="h-full min-h-[400px] flex items-center justify-center">

                                <div className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                            </div>

                        )}

                        <DataList
                            title="All Blog Posts"
                            desc="View and manage your articles"
                            data={blogs.map((b: any) => ({
                                ...b,
                                title: b.title,
                                desc: b.excerpt,
                                date: new Date(b.createdAt).toLocaleDateString(),
                                views: b.views || "0",
                                status: b.status,
                            }))}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            isLoading={isLoading}
                        >
                            {/* ✅ Working live search input */}
                            <div className="relative w-full min-w-[200px] md:min-w-[300px] max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Search Posts..."
                                    className="w-full p-3 pl-10 bg-[#313133] border border-[#90909066]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                                    value={inputValue}
                                    onChange={handleSearchChange}

                                />
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </DataList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
