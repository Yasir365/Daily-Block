"use client";
import FaqList from '@/components/admin/faq/FaqList';
import { TopHeader } from '@/components/admin/TopHeader';
import FaqSectionSingle, { FaqItem } from '@/components/multistep-form/FaqSingle';
import { CustomToast } from '@/components/ui/ReactToast';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { useCreateFaq, useDeleteFaq, useFetchFaqs } from '@/hooks/useFaq';
import { Plus, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const [showFaq, setShowFaq] = useState(false);
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const faqRef = useRef<HTMLDivElement>(null);
    const { data = [], isLoading, refetch } = useFetchFaqs();
    const { mutate: createFaq } = useCreateFaq();
    const { mutate: deleteFaq } = useDeleteFaq();


    const handleSaveFaq = (faq: FaqItem) => {
        createFaq(faq, {
            onSuccess: () => {
                toast.custom((t) => (
                    <CustomToast t={t} status="success" message="FAQ created successfully" />
                ));
                setShowFaq(false);
                refetch();
            },
            onError: (err: any) =>
                toast.custom((t) => (
                    <CustomToast t={t} status="error" message={err.message || "Failed to create FAQ"} />
                )),
        });
    };

    const handleRemoveFaq = (id: string) => {
        deleteFaq(id, {
            onSuccess: () => {
                toast.custom((t) => (
                    <CustomToast t={t} status="success" message="FAQ deleted successfully" />
                ));
                refetch();
            },
            onError: (err: any) =>
                toast.custom((t) => (
                    <CustomToast t={t} status="error" message={err.message || "Failed to delete FAQ"} />
                )),
        });
    };


    return (
        <div className="flex flex-col gap-8 w-full">
            <TopHeader
                pageName="Blog Management"
                pageDescription="Review, approve, or reject ICO submissions"
            />

            {/* ✅ Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
                    <div className="min-w-full">
                        <FaqList
                            title="FAQ Items"
                            desc="Add, edit, or remove coin listing FAQ items"
                            data={data}
                            // onChangeFaq={handleUpdateFaq}
                            onRemoveFaq={handleRemoveFaq}
                        >
                            <div className="flex gap-2 relative" ref={faqRef}>
                                {/* Add New FAQ Button */}
                                <BtnComp title="Add New FAQ" onClick={() => setShowFaq(!showFaq)} />

                                {/* ✅ FaqSection Dropdown */}


                            </div>
                        </FaqList>


                    </div>
                </div>
                {showFaq && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowFaq(false)}
                    >
                        {/* Stop propagation so clicking inside doesn't close */}
                        <div
                            className="relative w-[95vw] max-w-[900px] max-h-[95vh] bg-gradient-to-br from-[#121212] to-[#141B1F] border border-[#364349] rounded-[12px] p-6 overflow-y-auto shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button onClick={() => setShowFaq(false)}>
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            {/* Faq Form */}
                            <div className="mt-4">
                                <FaqSectionSingle onSave={handleSaveFaq} useEditor={true} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;

// ✅ Reusable Button Component
export const BtnComp = ({
    title,
    onClick,
    icon,
}: {
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}) => {
    return (
        <button
            onClick={onClick}
            className="font-inter font-bold text-sm cursor-pointer leading-[20px] 
            flex items-center justify-center gap-2 px-4 py-2 bg-brand-yellow 
            rounded-xl border border-[#2B2B31] text-[#2B2B31] w-full sm:w-auto sm:ml-auto
            transition-all duration-300 hover:bg-yellow-400 hover:shadow-md active:scale-95"
        >
            {icon ? icon : <Plus className="text-sm" />}
            {title}
        </button>
    );
};
