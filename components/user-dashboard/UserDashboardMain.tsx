"use client"
import { Files, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import UserDataTableDiv from './UserDataTableDiv';
import { useAuthContext } from '@/context/AuthContext';

const UserDashboardMain = () => {
    const { user, logout } = useAuthContext();
    const handleLogout = async () => {
        try {
            await logout(); // wait for context to clear

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    console.log({ user })
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl font-bold leading-snug">
                        Hello Zeeshan Vizz Web Solutions
                        <span className="text-sm font-normal text-gray-300">
                            &nbsp;(not&nbsp;{user?.email}?&nbsp;
                            <span className="text-brand-yellow cursor-pointer hover:underline" onClick={handleLogout}>
                                Log out
                            </span>
                            )
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300">
                        From your account dashboard you can view your&nbsp;
                        <span className="font-medium">recent orders</span>, manage your&nbsp;
                        <span className="font-medium">shipping and billing addresses</span>.
                    </p>
                </div>

                <button className="bg-[#F9A51A] text-[#3B3B3B] py-2 px-4 flex items-center justify-center gap-2 rounded-md hover:brightness-110 transition w-full sm:w-auto">
                    <Image src="/svg/coins/coin.svg" alt="coin" width={20} height={20} className="rounded-full" />
                    <span className="font-bold text-sm sm:text-base">List My Coin Now</span>
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-brand-glass p-4 sm:p-5 rounded-md flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-3/4 lg:w-1/2">
                <div className="flex justify-center sm:justify-start">
                    {/* <Image
                        src="/svg/user/userImg.svg"
                        alt="user"
                        width={100}
                        height={100}
                        className="rounded-full sm:rounded-none"
                    /> */}
                </div>

                <div className="flex flex-col gap-3 py-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold break-all">Hello, {user?.email}</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] sm:text-[15px] opacity-85">Identification:</p>
                            <span
                                className={`
                                        py-1 px-3 rounded-lg flex items-center gap-1 text-[12px] font-semibold
                                        ${user?.status !== "active" ? "bg-brand-red/20 text-brand-red" : "bg-[#16C78429]/80 text-[#00C288]"}
                                    `}
                            >
                                <ShieldCheck className="w-4 h-4" />
                                {user?.status === "active" ? "Verified" : "Not active"}
                            </span>

                        </div>
                    </div>

                    <span className="text-[13px] sm:text-[15px] text-[#FFFFFFD9]/85">
                        Last Login: {user?.lastLogin ? new Date(user?.lastLogin).toLocaleString() : "N/A"}
                    </span>

                    <span className="flex items-center gap-2 bg-[#EFF2F529]/16 text-[#DFDFDF] px-3 py-2 text-[12px] rounded-md w-fit">
                        <span className="font-medium">UID:</span>
                        <span>35403204</span>
                        <Files className="w-4 h-4" />
                    </span>
                </div>
            </div>

            <UserDataTableDiv title={"Verified ICO Listings"} status="" />
        </div>
    );
};

export default UserDashboardMain;
