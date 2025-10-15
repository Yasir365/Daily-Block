import { ChevronDown, Globe, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface TrendComponentProps {
    trend: "up" | "down";
    percent?: string;
    time?: string;
}

interface TrendItem {
    text: string;
    value: string;
    trend?: boolean;
    trendVal?: TrendComponentProps;
}
const TrendArray: TrendItem[] = [
    {
        text: "Volume (24h)",
        value: "$20.15K",
        trend: true,
        trendVal: {
            trend: "up",
            percent: "13.19%",
            time: "24h"
        }
    },
    {
        text: "FDV",
        value: "$321.4K"
    },
    {
        text: "Vol/Mkt Cap (24h)",
        value: "13.19%"
    },
    {
        text: "Holders",
        value: "12.52K"
    },
    {
        text: "Volume (24h)",
        value: "$20.15K",
        trend: true,
        trendVal: {
            trend: "up",
            percent: "13.19%",
            time: "24h"
        }
    },
    {
        text: "FDV",
        value: "$321.4K"
    },
    {
        text: "Vol/Mkt Cap (24h)",
        value: "13.19%"
    },
    {
        text: "Holders",
        value: "12.52K"
    },
]
const LeftSide = () => {
    return (
        <div className="flex flex-col col-span-2 gap-3">
            <div className="flex flex-col gap-3 bg-brand-glass py-4 px-5 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Image src="/svg/coins/perl.svg" alt="coin" width={25} height={25} className="rounded-full" />
                        <span className="text-lg font-semibold">PERL.eco</span>
                        <span className="relative w-20">
                            <span className="text-xs ">PERL</span>
                            <span className="absolute top-0 right-0 text-xs bg-gray-500 py-[1px] px-2 rounded-full">#2959</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1 py-2 px-3  bg-[#FFFFFF2B]  rounded-xl">
                            <Star className="w-4 h-4" />
                            <span>21k</span>
                        </div>
                        <div className="flex items-center gap-1 py-3 px-3  bg-[#FFFFFF2B]  rounded-xl">
                            <Share2 className="w-4 h-4 text-gray-300" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <h3 className="text-3xl font-bold text-white">$0.0003110</h3>
                    <TrendComponent trend='down' percent="-5.08%" time='24h' />
                </div>
            </div>
            <div className='flex flex-col px-4 gap-2'>
                <MarketDiv text='Market Cap' value='$20.15K' />
                <div className="flex flex-col gap-3    rounded-xl">

                    <div className='grid grid-cols-2 gap-2'>
                        {TrendArray.map((item, index) => (
                            <MarketDiv key={index} text={item.text} value={item.value} trend={item.trend} trendVal={item.trendVal} />
                        ))}
                    </div>
                </div>
                <MarketDiv text='Market Cap' value='$20.15K' />

                {/* === Profile Score === */}
                <div className="flex justify-between items-center bg-[#0E0E0E]/60 border border-[#1F1F1F] rounded-xl p-4 mt-2">
                    <span className='flex gap-2 items-center'>

                        <span className="text-gray-400 text-sm">Profile Score</span>
                        <Image src="/svg/coins/info.svg" alt="coin" width={16} height={16} />
                    </span>
                    <div className="flex items-center gap-2 w-[50%]">
                        <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-brand-yellow h-1.5 rounded-full"
                                style={{ width: "78%" }}
                            ></div>
                        </div>
                        <span className="text-gray-300 text-sm font-semibold">78%</span>
                    </div>
                </div>

                {/* === Boost Button === */}
                <button className="mt-3 border flex items-center justify-center gap-2 border-brand-yellow  text-brand-yellow font-semibold py-3 rounded-xl hover:opacity-90 transition">
                    <Image src="/svg/coins/rocket.svg" alt="coin" width={18} height={18} />
                    <span>Boost</span>
                </button>
                <div className='flex flex-col gap-6 mt-8'>
                    <ContainerRow text='Total Volume'>
                        <div className='flex gap-2 items-center'>
                            <Tab text="Website" icon={<Globe strokeWidth={1} />} />
                            <Tab text="Whitepaper" icon={<Image src="/svg/coins/file.svg" alt="coin" width={28} height={28} className="object-contain" />} />
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <ChevronDown strokeWidth={3} />
                            </span>
                        </div>
                    </ContainerRow>
                    <ContainerRow text='Total Volume'>
                        <div className='flex gap-2 items-center'>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/x.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/yellowsocial.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/git.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <ChevronDown strokeWidth={3} />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <ChevronDown strokeWidth={3} />
                            </span>
                        </div>
                    </ContainerRow>
                    <ContainerRow text='Total Volume'>
                        <div className='flex gap-2 items-center'>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/x.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/yellowsocial.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <Image src="/svg/coins/git.svg" alt="coin" width={20} height={20} className="object-contain" />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <ChevronDown strokeWidth={3} />
                            </span>
                            <span className='flex items-center justify-center flex-col   bg-[#1A1A1A] rounded-full h-10 w-10'>
                                <ChevronDown strokeWidth={3} />
                            </span>
                        </div>
                    </ContainerRow>

                </div>
            </div>
        </div>
    )
}

export default LeftSide
const TrendComponent = ({ trend, percent, time = "" }: TrendComponentProps) => {
    return (
        <span className={`items-center flex gap-1 ${trend === "up" ? "text-brand-green" : "text-brand-red"}`}>
            <Image src={`/svg/coins/${trend}.svg`} alt="coin" width={16} height={16} />
            {percent && <span>{percent}</span>}
            {time && <span>({time})</span>}
        </span>
    )
}

const MarketDiv = ({ text, value, trend = false, trendVal }: TrendItem) => {
    return (

        <div className="flex flex-col items-center justify-center bg-transparent border border-[#1F1F1F] rounded-xl p-3 hover:bg-[#1B1B1B]/70   transition-colors">
            <span className='flex flex-col  items-center justify-center gap-[2px]'>
                <span className='text-[#616E85] flex gap-1 items-center font-medium'>
                    <span>{text}</span>
                    <Image src="/svg/coins/info.svg" alt="coin" width={16} height={16} />
                </span>
                <span className='flex gap-2'>
                    <h3 className='text-white text-medium font-semibold'>{value}</h3>
                    {trend && <TrendComponent trend={trendVal?.trend || "up"} percent={trendVal?.percent || ""} time={trendVal?.time || ""} />}
                </span>
            </span>
        </div>

    )
}
const ContainerRow = ({ text, children }: { text?: string; children?: React.ReactNode }) => {
    return (
        <div className='flex items-center justify-between'>
            <h5 className='text-[#616E85] font-semibold text-sm capitalize'>{text}</h5>
            {children}
        </div>
    )
}
const Tab = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
    return (

        <span className='flex items-center py-1 px-3 gap-1 bg-[#1A1A1A] rounded-full h-10'>
            <span className="flex items-center justify-center w-6 h-6">{icon}</span>
            <h5 className='text-white font-semibold text-sm  leading-none'>{text}</h5>
        </span>
    )
}