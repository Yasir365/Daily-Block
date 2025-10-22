import Image from "next/image";

interface DashboardCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon?: string; // icon path e.g. "/svg/coins/combo.svg"
    color?: string; // optional for dynamic bg color like "brand-yellow"
    textColor?: string; // optional for dynamic bg color like "brand-yellow"
    valueCls?: string; // optional for dynamic bg color like "brand-yellow"
    height?: string
}

export const DashboardCard = ({
    title,
    value,
    valueCls = "text-[#F8FAFC]",
    height = "140px",
    change,
    icon,
    color = "brand-yellow",
    textColor = "brand-green",
}: DashboardCardProps) => {
    return (
        <div className={`h-[${height}] p-4 md:p-8 flex items-center justify-between rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]`}>
            {/* Left Side */}
            <div className={`flex flex-col ${height === "140px" ? "gap-2" : "gap-6"} `}>
                <p className="font-inter font-semibold text-[14px] leading-[20px] text-[#94A3B8] align-middle">
                    {title}
                </p>
                <span className="flex flex-col gap-2">

                    <h1 className={`${valueCls} font-inter font-bold text-[30px] leading-[36px]  align-middle`}>
                        {value}
                    </h1>
                    <p className={`text-${textColor} font-inter font-semibold text-sm leading-5 align-middle`}>
                        {change}
                    </p>
                </span>
            </div>

            {/* Right Side (Icon) */}
            {icon && <div className="h-full">
                <div
                    className={`w-12 h-12 rounded-[12px] p-3 flex items-center justify-center bg-${color}/10`}
                >
                    <Image src={icon} alt="icon" width={24} height={24} />
                </div>
            </div>
            }
        </div>
    );
};
