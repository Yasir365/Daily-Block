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
            >


            </TopHeader>


            {/* ✅ Table Section (fixed) */}
            {/* ✅ Responsive Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                    <div className="min-w-full">
                        <FaqList title="FAQ Items" desc="Add, edit, or remove coin listing FAQ items" data={data} >
                            {/* Search Bar */}
                            <div className='flex gap-2 items-center'>

                                <BtnComp title="Add New Post" />

                            </div>
                        </FaqList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page


export const BtnComp = ({ title, onClick, icon }: { title: string, onClick?: () => void, icon?: React.ReactNode }) => {
    return (<button onClick={onClick} className="font-inter font-bold text-sm cursor-pointer leading-[20px] flex items-center justify-center gap-2 px-4 py-2 
    bg-brand-yellow rounded-xl border border-[#2B2B31] text-[#2B2B31] 
    w-full sm:w-auto sm:ml-auto
    transition-all duration-300
    hover:bg-yellow-400 hover:shadow-md active:scale-95">
        {icon ? <React.Fragment>{icon}</React.Fragment> : <Plus className="text-sm" />}
        {title}
    </button>
    )


}