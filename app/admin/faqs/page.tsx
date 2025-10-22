"use client";
import FaqList from '@/components/admin/faq/FaqList';
import { TopHeader } from '@/components/admin/TopHeader'
import { Plus, Search, } from 'lucide-react';
import React from 'react'

const page = () => {

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
    return (
        <div className="flex flex-col gap-8  w-full   ">
            <TopHeader
                pageName="Blog Management"
                pageDescription="Review, approve, or reject ICO submissions"
            ><button className='font-inter font-bold text-sm cursor-pointer leading-[20px] flex items-center justify-center gap-2 px-4 py-2 bg-brand-yellow rounded-xl border border-[#2B2B31] text-[#2B2B31]'>
                    <Plus className='text-sm' />   Add FAQ
                </button>

            </TopHeader>


            {/* ✅ Table Section (fixed) */}
            {/* ✅ Responsive Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                    <div className="min-w-full">
                        <FaqList title="FAQ Items" desc="Add, edit, or remove coin listing FAQ items" data={data} >
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
                        </FaqList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page