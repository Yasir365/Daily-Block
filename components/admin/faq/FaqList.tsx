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
};

export default function FaqList({ title = "Table", desc, children, data }: DataTableProps) {
    return (

        <Wrapper title={title} desc={desc} children2={children}>
            <div className="overflow-y-auto flex flex-col mt-4 gap-3 px-4 sm:px-8 min-h-[200px] max-h-[600px]">
                {data.map((row, i) => (
                    <FaqCard handleInput={() => { }} data={data} />
                ))}
            </div>
        </Wrapper>
    );
} 