"use client";

import { LayoutGrid, Users, BookOpen, Settings, Lock, FileText, HelpCircle, Mail, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type SidebarLinkProps = {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SidebarLink = ({ href, children, isActive = false, icon: Icon }: SidebarLinkProps) => {
    const activeClasses = isActive
        ? "bg-brand-yellow text-black font-semibold rounded-lg shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200";

    const defaultClasses = "flex items-center gap-4 px-4 py-3 text-sm";

    return (
        <Link href={href} className={`${defaultClasses} ${activeClasses}`}>
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </Link>
    );
};

export const AdminSidebar = () => {
    const currentPath = "/admin";

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutGrid,
            isActive: currentPath === "/admin",
        },
        {
            name: "ICO Management",
            href: "/admin/ico",
            icon: DollarSign,
        },
        {
            name: "User Management",
            href: "/admin/users",
            icon: Users,
        },
        {
            name: "News Letter",
            href: "/admin/newsletter",
            icon: Mail,
        },
        {
            name: "Blogs",
            href: "/admin/blogs",
            icon: BookOpen,
        },
        {
            name: "General FAQ's",
            href: "/admin/faqs",
            icon: HelpCircle,
        },
        {
            name: "Privacy Policy",
            href: "/admin/privacy-policy",
            icon: Lock,
        },
        {
            name: "Terms & Conditions",
            href: "/admin/terms-&-conditions",
            icon: FileText,
        },
    ];

    return (
        <aside className="w-64 bg-brand-glass text-white p-4 flex flex-col h-screen">
            {/* Logo Section */}
            <div className="flex items-center h-20 px-2 mb-4  pb-2 border-b border-brand-gray">
                <div className="flex items-center gap-1">
                    <img src="/svg/logo.svg" alt="" />
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => (
                    <SidebarLink
                        key={item.name}
                        href={item.href}
                        isActive={item.isActive}
                        icon={item.icon}
                    >
                        {item.name}
                    </SidebarLink>
                ))}
            </nav>

            {/* Separator and Bottom Section (Settings and User Profile) */}
            <div className="mt-auto pt-4 space-y-4">

                {/* Settings Link */}
                <SidebarLink href="/admin/settings" icon={Settings}>
                    Settings
                </SidebarLink>

                {/* User Profile Card */}
                <div className="p-2 flex items-center gap-3 bg-white/5 rounded-lg">
                    {/* Placeholder for Admin User Image */}
                    <Image
                        src="/svg/profile.svg"
                        alt="Admin User"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">Admin User</span>
                        <span className="text-xs text-gray-400">admin@dailyblock.io</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};