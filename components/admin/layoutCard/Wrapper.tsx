"use client";

type DataTableProps = {
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    children2?: React.ReactNode;
    classMain?: string;

};

export default function Wrapper({ title = "", desc, children, children2, classMain = "" }: DataTableProps) {
    return (
        <div className={`w-full rounded-[12px] p-4 border border-[#90909033]  overflow-hidden ${classMain}`}>
            {title && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0 ">
                    <div className="flex flex-col gap-1 font-inter p-2 sm:p-4">
                        <h2 className="font-semibold text-[20px] sm:text-[24px] leading-[28px] text-[#F8FAFC]">
                            {title}
                        </h2>
                        {desc && (
                            <p className="font-normal text-[13px] sm:text-[14px] leading-[20px] text-[#94A3B8]">
                                {desc}
                            </p>
                        )}
                    </div>
                    {children2}
                </div>
            )}
            <div className="overflow-x-auto">{children}</div>
        </div>
    );
}
