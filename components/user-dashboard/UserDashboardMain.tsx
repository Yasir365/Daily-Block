import { Files, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UserDataTableDiv from './UserDataTableDiv';


const UserDashboardMain = () => {

    return (
        <div className='flex flex-col gap-4  w-full'>
            <span className='flex justify-between items-center w-full'>
                <span className='flex flex-col gap-1'>
                    <h1 className='text-xl font-bold'>Hello Zeeshan Vizz Web Solutions (not zeeshanvizzwebsolutions? Log out)</h1>
                    <p className='text-[18px] '>From your account dashboard you can view your recent orders, manage your shipping and billing addresses.</p>
                </span>
                <button className='bg-[#F9A51A] text-[#3B3B3B] py-2 px-4 flex gap-2 rounded-md'>
                    <Image src="/svg/coins/coin.svg" alt="coin" width={20} height={20} className="rounded-full" />
                    <span className='font-bold'>List My Coin Now</span>
                </button>
            </span>
            <div className='bg-brand-glass p-3 rounded-md flex gap-3 w-1/2'>
                <Image src="/svg/user/userImg.svg" alt="coin" width={131} height={131} className="" />
                <div className='flex flex-col gap-3 py-2'>
                    <span className='flex items-center gap-4'>
                        <h3 className='text-3xl font-bold'>Hello, jh**@**.com</h3>
                        <span className='flex items-center gap-2'>
                            <p className='text-[15px] opacity-[85%]'>Identification:</p>
                            <span className='py-1 px-3 rounded-lg bg-[#16C78429]/80 text-[#00C288] items-center flex gap-1'>
                                <ShieldCheck className='w-4 h-4 ' />
                                <span className='text-[12px] font-semibold'>Verfied</span>

                            </span>
                        </span>
                    </span>
                    <span className='text-[15px] text-[#FFFFFFD9]/85'>Last Login: 12-15-2024 16:13:15 USA</span>
                    <span className="flex items-center gap-2 bg-[#EFF2F529]/16 text-[#DFDFDF] px-3 py-2 text-[12px] rounded-md w-fit">
                        <span className="font-medium">UID:</span>
                        <span>35403204</span>
                        <Files className="w-4 h-4" />
                    </span>
                </div>
            </div>

            <UserDataTableDiv title={"My ICO Listings"} />
        </div>
    )
}

export default UserDashboardMain