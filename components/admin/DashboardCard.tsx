import Image from "next/image";

interface DashboardCardProps {
    title: string;
    value: string | number;
    change: string;
    icon: string; // icon path e.g. "/svg/coins/combo.svg"
    color?: string; // optional for dynamic bg color like "brand-yellow"
    textColor?: string; // optional for dynamic bg color like "brand-yellow"
}

export const DashboardCard = ({
    title,
    value,
    change,
    icon,
    color = "brand-yellow",
    textColor = "brand-green",
}: DashboardCardProps) => {
    return (
        <div className="h-[140px] p-4 md:p-8 flex items-center justify-between rounded-[12px] border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]">
            {/* Left Side */}
            <div className="flex flex-col gap-2">
                <p className="font-inter font-semibold text-[14px] leading-[20px] text-[#94A3B8] align-middle">
                    {title}
                </p>
                <h1 className="font-inter font-bold text-[30px] leading-[36px] text-[#F8FAFC] align-middle">
                    {value}
                </h1>
                <p className={`text-${textColor} font-inter font-semibold text-sm leading-5 align-middle`}>
                    {change}
                </p>
            </div>

            {/* Right Side (Icon) */}
            <div className="h-full">
                <div
                    className={`w-12 h-12 rounded-[12px] p-3 flex items-center justify-center bg-${color}/10`}
                >
                    <Image src={icon} alt="icon" width={24} height={24} />
                </div>
            </div>
        </div>
    );
};
