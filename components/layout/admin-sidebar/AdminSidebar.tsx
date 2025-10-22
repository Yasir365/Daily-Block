"use client";

import { LayoutGrid, Users, BookOpen, Settings, Lock, FileText, HelpCircle, Mail, DollarSign, X } from "lucide-react"; // 👈 Added 'X' icon
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
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

type AdminSidebarProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
    const currentPath = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutGrid,
            // Check if the currentPath is an exact match for the Dashboard
            isActive: currentPath === "/admin",
        },
        {
            name: "ICO Management",
            href: "/admin/icto-management",
            icon: DollarSign,
            // Check if the currentPath starts with this path for nested routes
            isActive: currentPath.startsWith("/admin/icto-management"),
        },
        {
            name: "User Management",
            href: "/admin/users",
            icon: Users,
            isActive: currentPath.startsWith("/admin/users"),
        },
        {
            name: "News Letter",
            href: "/admin/newsletter",
            icon: Mail,
            isActive: currentPath.startsWith("/admin/newsletter"),
        },
        {
            name: "Blogs",
            href: "/admin/blogs",
            icon: BookOpen,
            isActive: currentPath.startsWith("/admin/blogs"),
        },
        {
            name: "General FAQ's",
            href: "/admin/faqs",
            icon: HelpCircle,
            isActive: currentPath.startsWith("/admin/faqs"),
        },
        {
            name: "Privacy Policy",
            href: "/admin/privacy-policy",
            icon: Lock,
            isActive: currentPath.startsWith("/admin/privacy-policy"),
        },
        {
            name: "Terms & Conditions",
            href: "/admin/terms-&-conditions",
            icon: FileText,
            isActive: currentPath.startsWith("/admin/terms-&-conditions"),
        },
    ];

    const responsiveClasses = isOpen
        ? "translate-x-0 ease-out"
        : "-translate-x-full ease-in";

    return (
        <>
            {/* Mobile Overlay (Only visible when sidebar is open on small screens) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    aria-hidden="true"
                ></div>
            )}

            {/* Main Sidebar */}
            <aside
                className={`w-64 bg-[#121824] lg:bg-brand-glass text-white p-4 flex flex-col h-screen fixed left-0 top-0 z-30 
                    transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${responsiveClasses}`}
            >

                {/* Logo Section */}
                <div className="flex items-center h-20 px-2 mb-4 pb-2 border-b border-brand-gray justify-between">
                    <div className="flex items-center gap-1">
                        <img src="/svg/logo.svg" alt="Logo" />
                    </div>

                    {/* Close Button for Mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-white lg:hidden hover:text-brand-yellow transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <SidebarLink
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            isActive={item.isActive}
                            icon={item.icon}
                        >
                            {item.name}
                        </SidebarLink>
                    ))}
                    <SidebarLink href="/admin/settings" icon={Settings} isActive={currentPath.startsWith("/admin/settings")} onClick={() => setIsOpen(false)}>
                        Settings
                    </SidebarLink>
                </nav>

                <div className="mt-auto pt-4 space-y-4">
                    {/* User Profile Card */}
                    <div className="p-2 flex items-center gap-3 bg-white/5 rounded-lg">
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
        </>
    );
};