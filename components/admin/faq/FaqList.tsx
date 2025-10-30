"use client";

import { Edit, Ban, FileText, SquarePen, Trash2 } from "lucide-react";
import Wrapper from "../layoutCard/Wrapper";
import StatusBadge from "@/components/ui/Badge";
import FaqCard from "@/components/ui/FaqCard";


type DataTableProps = {
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    data: any[];
    onChangeFaq?: (index: string, field: string, value: string) => void;
    onRemoveFaq?: (index: string) => void;
};

export default function FaqList({
    title = "Table",
    desc,
    children,
    data,
    onChangeFaq,
    onRemoveFaq,
}: DataTableProps) {
    return (

        <Wrapper title={title} desc={desc} children2={children}>
            <div className="overflow-y-auto flex flex-col mt-4 gap-3 min-h-[400px] max-h-[600px]">
                {data.length > 0 ? (
                    data.map((faq, i) => (
                        <FaqCard
                            key={i}
                            index={faq._id || i}
                            faq={faq}
                            onChange={onChangeFaq!}
                            onRemove={onRemoveFaq!}
                            type="read"

                        />
                    ))
                ) : (
                    <p className="text-gray-400 text-center py-10">No FAQ items added yet.</p>
                )}
            </div>
        </Wrapper>
    );
} 