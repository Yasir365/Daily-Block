"use client";
import FaqList from '@/components/admin/faq/FaqList';
import Wrapper from '@/components/admin/layoutCard/Wrapper';
import { TopHeader } from '@/components/admin/TopHeader'
import InputField from '@/components/ui/Input';
import { Github, Globe, Instagram, Linkedin, Lock, MessageCircle, Plus, Search, Trash2, Twitter, Upload, Youtube, } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
const socialLinks = [
    { label: "Facebook", name: "facebook", icon: <Image src="/svg/social/facebook.svg" alt="facebook" width={12} height={12} />, placeholder: "https://www.facebook.com/username" },
    { label: "Twitter", name: "twitter", icon: <Twitter size={14} />, placeholder: "https://www.twitter.com/username" },
    { label: "Instagram", name: "instagram", icon: <Instagram size={14} />, placeholder: "https://www.instagram.com/username" },
    { label: "LinkedIn", name: "linkedin", icon: <Linkedin size={14} />, placeholder: "https://www.linkedin.com/in/username" },
    { label: "YouTube", name: "youtube", icon: <Youtube size={14} />, placeholder: "https://www.youtube.com/@channelname" },
    { label: "GitHub", name: "github", icon: <Github size={14} />, placeholder: "https://github.com/username" },
    { label: "Telegram", name: "telegram", icon: <MessageCircle size={14} />, placeholder: "https://t.me/username" },
    { label: "Website", name: "website", icon: <Globe size={14} />, placeholder: "https://www.yourwebsite.com" },
];
// ✅ COMMON CLASS VARIABLES
const wrapperClass = 'border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]';
const titleClass = 'font-[600] text-[18px] leading-[28px] align-middle text-[#F1F4F4] font-segoe';
const inputClass = 'bg-[#29383D]';
const labelClass = 'text-white text-sm flex items-center gap-2';
const buttonPrimary = 'inline-flex items-center gap-1 bg-[#172126] text-white px-6 py-3 rounded-xl text-[13px] md:text-[16px] hover:bg-[#1f2e35] transition-all';
const buttonDanger = 'inline-flex items-center gap-1 bg-[#172126] px-6 py-3 rounded-xl border border-[#DC2828] text-[#DC2828] text-[13px] md:text-[16px] hover:bg-[#2a1717] transition-all';
const saveButton = 'inline-flex px-6 py-3 text-black bg-brand-yellow rounded-xl w-fit font-inter font-semibold text-[16px] leading-[24px]';

const page = () => {
    const [formData, setFormData] = useState({
        profilePic: "", // new field

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        apptAddress: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        github: "",
        telegram: "",
        website: "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
        alert("Profile updated successfully!");
    };

    const handlePasswordUpdate = () => {
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
    };
    // handle profile picture upload
    const handleProfilePicChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
        }
    };



    return (
        <div className="flex flex-col gap-8  w-full   ">
            <TopHeader
                pageName="Settings"
                pageDescription="Manage your admin preferences and security"
            />


            {/* ✅ Table Section (fixed) */}
            {/* ✅ Responsive Table Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px]">
                    <div className="min-w-full flex flex-col gap-6">
                        <Wrapper classMain={wrapperClass}>
                            <div className='flex flex-col gap-8 p-2 h-fit '>
                                <span className={titleClass}>
                                    Profile Picture
                                </span>
                                <span className='flex items-center gap-8 font-segoe  flex-col md:flex-row'>
                                    <div className="relative w-28 h-28">

                                        <Image
                                            src={formData.profilePic || "/profile.jpg"}
                                            alt="profile" width={100} height={100} className="rounded-full object-cover w-28 h-28 border-2 border-[#F1F4F4]"
                                        />

                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleProfilePicChange}
                                        />
                                    </div>
                                    <span className='flex items-center gap-4 font-semibold'>
                                        <button
                                            onClick={() => document.getElementById("profile-upload")?.click()} // ✅ triggers file input

                                            className={buttonPrimary}><Upload size={"16"} />Upload New Picture</button>
                                        <button className={buttonDanger}><Trash2 size={"16"} />Delete</button>
                                    </span>
                                </span>
                            </div>
                        </Wrapper>
                        <Wrapper classMain={wrapperClass}>
                            <div className='flex flex-col gap-8 p-2 h-fit '>
                                <span className={titleClass}>
                                    Personal
                                </span>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6'>
                                    <InputField label="First Name" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Last Name" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Email Address" name="email" placeholder="name@example.com" value={formData.email} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="phone number" name="phone" placeholder="+1 (555)-4567" value={formData.phone} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />

                                </div>
                            </div>
                        </Wrapper>
                        <Wrapper classMain={wrapperClass}>
                            <div className='flex flex-col gap-8 p-2 h-fit '>
                                <span className={titleClass}>
                                    Resident Address
                                </span>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6'>
                                    <InputField label="Street Address" name="streetAddress" placeholder="123 Example Street" value={formData.streetAddress} onChange={handleInput} className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Apartment, Suite, etc." name="apptAddress" placeholder="Apt #4B" value={formData.apptAddress} onChange={handleInput} className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="City" name="city" placeholder="Enter your city" value={formData.city} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="State / Province" name="state" placeholder="Enter your state" value={formData.state} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Zip / Postal Code" name="zip" placeholder="12345" value={formData.zip} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Country" name="country" placeholder="Enter your country" value={formData.country} onChange={handleInput} className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />

                                </div>
                            </div>
                        </Wrapper>
                        <Wrapper classMain={wrapperClass}>
                            <div className='flex flex-col gap-8 p-2 h-fit '>
                                <span className={titleClass}>
                                    Social Media Links
                                </span>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6'>
                                    {socialLinks.map(({ label, name, placeholder, icon }) => (
                                        <InputField
                                            key={name}
                                            label={label}
                                            name={name}
                                            placeholder={placeholder}
                                            value={formData[name as keyof typeof formData] || ""}
                                            lblIcon={icon}
                                            onChange={handleInput}
                                            inputClass={inputClass}
                                            lblCls={labelClass}
                                        />
                                    ))}

                                </div>
                            </div>
                        </Wrapper>
                        <Wrapper classMain={wrapperClass}>
                            <div className='flex flex-col gap-8 p-2 h-fit '>
                                <span className="font-[600] text-[18px] leading-[28px] align-middle text-[#F1F4F4] font-segoe flex items-center gap-4">
                                    <Lock />  Change Password
                                </span>
                                <div className="grid grid-cols-1 gap-4">
                                    <InputField label="Current Password" name="password" placeholder="Enter current password" value={formData.password} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="New Password" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <InputField label="Confirm New Password" name="confirmNewPassword" placeholder="Confirm new password" value={formData.confirmNewPassword} onChange={handleInput} inputClass={inputClass} lblCls="text-white text-sm" />
                                    <button onClick={handlePasswordUpdate} className="mt-2 inline-flex px-6 py-3 text-[#F1F4F4] bg-[#172126] rounded-xl w-fit font-inter font-semibold text-[14px] leading-[20px]">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </Wrapper>
                        {/* ✅ Save Changes */}
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleSubmit}
                                className={saveButton}
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page