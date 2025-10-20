
"use client"; // <-- must be the very first line
import { Switch } from "antd";
import { Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [checked, setChecked] = useState(false);
    return (
        <div className="min-h-screen flex flex-col gap-8 container px-4 mx-auto mt-6">
            <div className="flex flex-col ">
                <h1
                    className="ml-3 font-titilliumWeb font-bold text-[30px] leading-[47.1px] tracking-[0px]"
                >
                    Settings
                </h1>
                <p className="text-[16px] font-inter text-brand-gray2">Manage your admin preferences and security</p>
            </div>

            <div className="flex flex-col w-full rounded-lg  border border-brand-muted/20">
                <div className="flex flex-col md:flex-row w-full gap-4 px-12 py-8 items-start md:items-center">
                    <Image
                        src="/svg/user/userImg.svg"
                        alt="settings"
                        className="rounded-full"
                        width={100}
                        height={100}
                    />
                    <span className="flex gap-4">

                        <button className="bg-[#F0F0F0] py-2 px-3 text-black rounded-lg">Upload New Picture </button>
                        <button className="bg-[#F0F0F0] py-2 px-3 text-black rounded-lg">Delete </button>
                    </span>
                </div>
                <div className="w-full bg-brand-muted/20 p-[1px]"></div>

                <div className="flex flex-col w-full gap-6 px-12 py-8 ">
                    <h3 className="font-lato font-normal text-[14px] leading-[24px] text-white">
                        Account security
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <LabelTag label="Email" text="test@gmail.com" />
                        </div>
                        <button className="bg-[#F0F0F0] py-2 px-3 text-black rounded-lg">Change Email </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <LabelTag label="2-step verification" text="Add an additional layer of security to your account during login." />
                        </div>
                        <Switch
                            className="white"
                            checked={checked}
                            onChange={() => { setChecked(!checked) }}
                        />
                    </div>
                </div>
                <div className="w-full bg-brand-muted/20 p-[1px]"></div>
                <div className="flex flex-col w-full gap-6 px-12 py-8 ">
                    <h3 className="font-lato font-normal text-[14px] leading-[24px] text-white">
                        Account security
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <LabelTag label="Support Success" text="Support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time." />
                        </div>
                        <Switch
                            className="white"
                            checked={checked}
                            onChange={() => { setChecked(!checked) }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <LabelTag label="Log out of all devices" text="Log out of all other active sessions on other devices besides this one." />
                        </div>
                        <Switch
                            className="white"
                            checked={checked}
                            onChange={() => { setChecked(!checked) }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <LabelTag cls="text-[#C76060]" label="Delete my account" text="Permanently delete the account and remove access from all workspaces." />
                        </div>
                        <Switch
                            className="white"
                            checked={checked}
                            onChange={() => { setChecked(!checked) }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button className="flex items-center font-inter font-semibold text-sm leading-[20px] text-[#3B3B3B] gap-4 bg-brand-yellow py-3 px-6 rounded-lg w-fit">
                    <Save />    Save Changes
                </button>
            </div>
        </div>
    );
}
const LabelTag = ({ label, text, cls = "text-brand-yellow" }: { label: string, text: string, cls?: string }) => {
    return <span className="flex flex-col gap-1">

        <label
            htmlFor={label}
            className={`${cls} text-[14px] font-bold leading-[19px]`}
        >
            {label}
        </label>
        <p className="font-lato font-normal text-[14px] leading-[24px] tracking-[0px] text-white">
            {text}
        </p>
    </span>
} 