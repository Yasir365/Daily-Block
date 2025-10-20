"use client";

import { LayoutGrid, Users, BarChart2, BookOpen, Settings, Lock, FileText, HelpCircle, Mail, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Use next/image for better image handling

type SidebarLinkProps = {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SidebarLink = ({ href, children, isActive = false, icon: Icon }: SidebarLinkProps) => {
    // Styles for the active state (Dashboard)
    const activeClasses = isActive
        ? "bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200";

    // Styles for the inactive state
    const defaultClasses = "flex items-center gap-4 px-4 py-3 text-sm";

    return (
        <Link href={href} className={`${defaultClasses} ${activeClasses}`}>
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </Link>
    );
};

export const AdminSidebar = () => {
    // Determine the current path for active link logic (simplified here)
    const currentPath = "/admin";

    // An array to easily manage all the sidebar links and their icons
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
            icon: DollarSign, // Using a dollar sign for ICO/Finance
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
            href: "/admin/privacy",
            icon: Lock, // Using a lock for policy/security
        },
        {
            name: "Terms & Conditions",
            href: "/admin/terms",
            icon: FileText,
        },
    ];

    return (
        // The background is a gradient from a very dark gray (900) to a darker gray-black (950)
        // to mimic the slight vertical gradient in the image.
        <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 flex flex-col h-screen fixed">

            {/* Logo Section */}
            <div className="flex items-center h-20 px-2 mb-4">
                {/* NOTE: I've replaced the simple <img> with a component 
                    that closely matches the "DailyBlock" logo in the image.
                    In a real app, you would use a single logo image.
                */}
                <div className="flex items-center gap-1">
                    {/* Placeholder for the hexagon logo icon (yellow) */}
                    <div className="w-8 h-8 bg-yellow-500 clip-path-hexagon flex items-center justify-center">
                        <LayoutGrid className="w-4 h-4 text-gray-900" />
                    </div>
                    {/* Placeholder for the name "DailyBlock" */}
                    <span className="text-xl font-bold text-white">DailyBlock</span>
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
                        src="/path/to/admin-profile.jpg" // Replace with the actual image path
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