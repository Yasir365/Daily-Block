"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
    Github,
    Globe,
    Instagram,
    Linkedin,
    Lock,
    MessageCircle,
    Trash2,
    Twitter,
    Upload,
    Youtube,
} from "lucide-react";

import Wrapper from "@/components/admin/layoutCard/Wrapper";
import { TopHeader } from "@/components/admin/TopHeader";
import InputField from "@/components/ui/Input";
import toast from "react-hot-toast";
import { CustomToast } from "@/components/ui/ReactToast";


// ✅ Validation schema (Zod)
const ProfileSchema = z.object({
    imageProfile: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    streetAddress: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    github: z.string().optional(),
    telegram: z.string().optional(),
    website: z.string().optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

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
const wrapperClass = "border border-[#90909066] bg-[#3B3B3B80] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px]";
const titleClass = "font-[600] text-[18px] leading-[28px] align-middle text-[#F1F4F4] font-segoe";
const inputClass = "bg-[#29383D]";
const labelClass = "text-white text-sm flex items-center gap-2";
const buttonPrimary = "inline-flex items-center gap-1 bg-[#172126] text-white px-6 py-3 rounded-xl text-[13px] md:text-[16px] hover:bg-[#1f2e35] transition-all";
const buttonDanger = "inline-flex items-center gap-1 bg-[#172126] px-6 py-3 rounded-xl border border-[#DC2828] text-[#DC2828] text-[13px] md:text-[16px] hover:bg-[#2a1717] transition-all";
const saveButton = "inline-flex px-6 py-3 text-black bg-brand-yellow rounded-xl w-fit font-inter font-semibold text-[16px] leading-[24px]";

const Page = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(ProfileSchema),
        mode: "onBlur",
        defaultValues: {
            imageProfile: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            streetAddress: "",
            apartment: "",
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
        },
    });

    const imageProfile = watch("imageProfile");

    // ✅ Fetch user profile data
    const { data: profileData, isLoading, isError } = useQuery({
        queryKey: ["profileData"],
        queryFn: async () => {
            const res = await fetch("/api/users/profile");
            if (!res.ok) throw new Error("Failed to fetch profile");
            return res.json();
        },
        staleTime: 5 * 60 * 1000, // cache for 5 min
    });
    useEffect(() => {
        if (profileData) {
            // Reset form values based on fetched data
            reset({
                imageProfile: profileData.user.image || "",
                firstName: profileData.user.firstName || "",
                lastName: profileData.user.lastName || "",
                email: profileData.user.email || "",
                phone: profileData.user.phone || "",
                streetAddress: profileData.user.streetAddress || "",
                apartment: profileData.user.apartment || "",
                city: profileData.user.city || "",
                state: profileData.user.state || "",
                zip: profileData.user.zip || "",
                country: profileData.user.country || "",
                facebook: profileData.user.facebook || "",
                twitter: profileData.user.twitter || "",
                instagram: profileData.user.instagram || "",
                linkedin: profileData.user.linkedin || "",
                youtube: profileData.user.youtube || "",
                github: profileData.user.github || "",
                telegram: profileData.user.telegram || "",
                website: profileData.user.website || "",
                password: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        }
    }, [profileData, reset]);

    // ✅ Mutation using TanStack Query (api/route.ts expected)
    const updateProfileMutation = useMutation({
        mutationFn: async (data: ProfileFormData) => {
            const formData = new FormData();

            // append text fields
            Object.entries(data).forEach(([key, value]) => {
                if (value && key !== "imageProfile") formData.append(key, value as string);
            });

            // append user ID (you can get it from context or profileData)
            formData.append("userId", profileData?.user?._id || "");

            // append image file if selected
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const res = await fetch("/api/users/profile", {
                method: "PATCH",
                body: formData, // ✅ no need for headers; browser sets correct boundary
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to update profile");
            }

            return res.json();
        },
        onSuccess: () => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="success"
                    message="Profile updated successfully"
                />
            ))
        },
        onError: (err: any) => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message={err.message || "Something went wrong"}
                />
            ))
        },
    });


    // ✅ Form submit
    const onSubmit = (data: ProfileFormData) => {
        if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message="New passwords do not match"
                />
            ))
            return;
        }
        updateProfileMutation.mutate(data);
    };

    // ✅ Handle profile picture change
    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setValue("imageProfile", imageUrl, { shouldValidate: true });
            setSelectedFile(file); // store the actual file object

        }
    };

    // Password update button handler (uses current form values)
    const handlePasswordUpdate = () => {
        const vals = getValues();
        if (!vals.newPassword) {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message="New password is required"
                />
            ))
            return;
        }
        if (vals.newPassword !== vals.confirmNewPassword) {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message="New passwords do not match"
                />
            ))
            return;
        }
        // you can either call a dedicated password mutation here,
        // or reuse the main mutation (below we just show alert as before)
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="success"
                message="Password will be updated as soon as you update your profile"
            />
        ))
    };

    useEffect(() => {
        // If you want to populate the form from an API on mount, call reset(...) here.
        // Example:
        // fetch('/api/me').then(r=>r.json()).then(data=>reset(data));
    }, [reset]);

    return (
        <div className="flex flex-col gap-8 w-full">
            <TopHeader pageName="Settings" pageDescription="Manage your admin preferences and security" />

            <div className="grid grid-cols-1 gap-4">
                <div className="overflow-x-auto rounded-[12px]">
                    <div className="min-w-full flex flex-col gap-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <Wrapper classMain={wrapperClass}>
                                <div className="flex flex-col gap-8 p-2 h-fit">
                                    <span className={titleClass}>Profile Picture</span>
                                    <span className="flex items-center gap-8 font-segoe flex-col md:flex-row">
                                        <div className="relative w-28 h-28">
                                            {/* using next/image; object URLs are supported but if you run into issues you can switch to <img> */}
                                            <Image
                                                src={imageProfile || "/profile.jpg"}
                                                alt="profile"
                                                width={100}
                                                height={100}
                                                className="rounded-full object-cover w-28 h-28 border-2 border-[#F1F4F4]"
                                            />
                                            <input
                                                id="profile-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleProfilePicChange}
                                            />
                                        </div>
                                        <span className="flex items-center gap-4 font-semibold">
                                            <button type="button" onClick={() => document.getElementById("profile-upload")?.click()} className={buttonPrimary}>
                                                <Upload size={"16"} />Upload New Picture
                                            </button>
                                            <button
                                                type="button"
                                                className={buttonDanger}
                                                onClick={() => {
                                                    setValue("imageProfile", "");
                                                    setSelectedFile(null);
                                                }}
                                            >
                                                <Trash2 size={"16"} />Delete
                                            </button>
                                        </span>
                                    </span>
                                </div>
                            </Wrapper>

                            <Wrapper classMain={wrapperClass}>
                                <div className="flex flex-col gap-8 p-2 h-fit">
                                    <span className={titleClass}>Personal</span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <InputField {...field} label="First Name" placeholder="Enter your first name" inputClass={inputClass} lblCls="text-white text-sm" />
                                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <InputField {...field} label="Last Name" placeholder="Enter your last name" inputClass={inputClass} lblCls="text-white text-sm" />
                                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <InputField {...field} label="Email Address" placeholder="name@example.com" inputClass={inputClass} lblCls="text-white text-sm" />
                                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => {
                                                const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                    let value = e.target.value.replace(/\D/g, "");
                                                    if (value.length > 0) value = "+" + value;
                                                    if (value.length > 2)
                                                        value = value.replace(/^(\+\d{1,3})(\d{0,3})(\d{0,3})(\d{0,4}).*/, "$1 ($2) $3-$4");
                                                    field.onChange(value.trim());
                                                };

                                                return (
                                                    <div>
                                                        <InputField
                                                            {...field}
                                                            value={field.value || ""}
                                                            onChange={handlePhoneChange}
                                                            label="Phone Number"
                                                            placeholder="+1 (555) 123-4567"
                                                            inputClass={inputClass}
                                                            lblCls="text-white text-sm"
                                                        />
                                                        {errors.phone && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        />


                                    </div>
                                </div>
                            </Wrapper>

                            <Wrapper classMain={wrapperClass}>
                                <div className="flex flex-col gap-8 p-2 h-fit">
                                    <span className={titleClass}>Resident Address</span>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
                                        <Controller name="streetAddress" control={control} render={({ field }) => <InputField {...field} label="Street Address" placeholder="123 Example Street" className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                        <Controller name="apartment" control={control} render={({ field }) => <InputField {...field} label="Apartment, Suite, etc." placeholder="Apt #4B" className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                        <Controller name="city" control={control} render={({ field }) => <InputField {...field} label="City" placeholder="Enter your city" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                        <Controller name="state" control={control} render={({ field }) => <InputField {...field} label="State / Province" placeholder="Enter your state" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                        <Controller name="zip" control={control} render={({ field }) => <InputField {...field} label="Zip / Postal Code" placeholder="12345" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                        <Controller name="country" control={control} render={({ field }) => <InputField {...field} label="Country" placeholder="Enter your country" className="md:col-span-3" inputClass={inputClass} lblCls="text-white text-sm" />} />
                                    </div>
                                </div>
                            </Wrapper>

                            <Wrapper classMain={wrapperClass}>
                                <div className="flex flex-col gap-8 p-2 h-fit">
                                    <span className={titleClass}>Social Media Links</span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                                        {socialLinks.map(({ label, name, placeholder, icon }) => (
                                            <Controller
                                                key={name}
                                                name={name as keyof ProfileFormData}
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <InputField {...field} label={label} placeholder={placeholder} lblIcon={icon} inputClass={inputClass} lblCls={labelClass} />
                                                        {errors[name as keyof ProfileFormData] && <p className="text-red-500 text-sm mt-1">{(errors as any)[name]?.message}</p>}
                                                    </div>
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Wrapper>

                            <Wrapper classMain={wrapperClass}>
                                <div className="flex flex-col gap-8 p-2 h-fit">
                                    <span className="font-[600] text-[18px] leading-[28px] align-middle text-[#F1F4F4] font-segoe flex items-center gap-4">
                                        <Lock /> Change Password
                                    </span>
                                    <div className="grid grid-cols-1 gap-4">
                                        <Controller name="password" control={control} render={({ field }) => <InputField {...field} label="Current Password" placeholder="Enter current password" inputClass={inputClass} lblCls="text-white text-sm" type="password" />} />
                                        <Controller name="newPassword" control={control} render={({ field }) => <InputField {...field} label="New Password" placeholder="Enter new password" inputClass={inputClass} lblCls="text-white text-sm" type="password" />} />
                                        <Controller name="confirmNewPassword" control={control} render={({ field }) => <InputField {...field} label="Confirm New Password" placeholder="Confirm new password" inputClass={inputClass} lblCls="text-white text-sm" type="password" />} />
                                        <div className="flex gap-3">
                                            <button type="button" onClick={handlePasswordUpdate} className="mt-2 inline-flex px-6 py-3 text-[#F1F4F4] bg-[#172126] rounded-xl w-fit font-inter font-semibold text-[14px] leading-[20px]">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Wrapper>

                            {/* ✅ Save Changes */}
                            <div className="flex items-center justify-end">
                                <button type="submit" className={saveButton}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
