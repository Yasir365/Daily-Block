"use client";

import { Edit, Ban } from "lucide-react";

type TableColumn = {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    className?: string;
};

type DataTableProps = {
    title?: string;
    columns: TableColumn[];
    data: any[];
};

export default function DataTable({ title = "Table", columns, data }: DataTableProps) {
    return (
        <div className="w-full rounded-[12px] p-4 border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[6px] overflow-hidden">
            {title && (
                <h2 className="  p-4 font-inter font-semibold text-[24px] leading-[24px] tracking-[-0.6px] align-middle text-[#F8FAFC]">
                    {title}
                </h2>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-300">
                    <thead className="bg-transparent text-gray-400 uppercase text-xs  ">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}
                                    className="px-6 py-4 whitespace-nowrap font-inter font-semibold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#94A3B8] uppercase"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b border-[#ffffff0f] hover:bg-[#ffffff05] transition">
                                {columns.map((col) => (
                                    <td key={col.key}
                                        className={`px-6 py-8 whitespace-nowrap ${col.className || ""}`}
                                    >
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
