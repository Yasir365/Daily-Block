"use client";
import { useRef, useState } from 'react';
import Link from "next/link";
import { Search, Star, Menu, UserRoundPen, X, LogOut } from 'lucide-react';
import Notifications from '@/components/dropdowns/Notification';
import { useAuthContext } from '@/context/AuthContext';
import { UniversalContainer } from '@/components/ui/UniversalContainer';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';



export const UserNavbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, loading, logout } = useAuthContext();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const navLinkStyle = "text-sm font-medium hover:text-brand-yellow transition-colors block py-2 px-4";
    const handleLogout = async () => {
        try {
            await logout(); // wait for context to clear
            // setIsOpen(false);
            setOpen(false);
            router.push("/auth/login"); // navigate to homepage
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    const handleUser = () => {
        if (user && user.type === "user") {
            router.push("/user/dashboard");
        } else {
            router.push("/admin");
        }
    }
    return (
        <nav className="py-2 px-4 md:px-12 flex justify-between items-center text-brand-muted relative z-50">

            {/* 1. Left Section: Logo & Main Navigation Links */}
            <div className="flex items-center space-x-6">

                {/* Logo */}
                <Link href="/" className="flex items-center text-xl font-extrabold text-brand-yellow">
                    <img src="/svg/logo.svg" alt="DailyBlock" className="h-8" />
                </Link>

                {/* Navigation Links (Hidden on small screens) */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium hover:text-brand-yellow transition-colors">
                        Cryptocurrencies
                    </Link>
                    <Link href="/community" className="text-sm font-medium hover:text-brand-yellow transition-colors">
                        Community
                    </Link>
                    <Link href="/blogs" className="text-sm font-medium hover:text-brand-yellow transition-colors">
                        Blogs
                    </Link>
                </div>
            </div>

            {/* 2. Right Section: Controls, Login, and Menu Icon */}
            <div className="flex items-center space-x-3">

                {/* Watchlist & Search Bar */}
                <div className="hidden md:flex items-center space-x-3 rounded-lg p-2">

                    {/* Watchlist */}
                    <Link href="/watchlist" className="flex items-center text-sm font-medium hover:text-brand-yellow transition-colors rounded-md p-1">
                        <Star className="w-4 h-4 mr-1" />
                        Watchlist
                    </Link>

                    {/* Search Input */}
                    <div className="flex items-center px-4 py-2 rounded-xl bg-brand-glass">
                        <Search className="w-4 h-4 text-brand-muted mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-sm text-white placeholder-brand-muted focus:outline-none w-40"
                        />
                    </div>
                </div>

                {/* Notification Icon with Dropdown and Badge */}
                {isAuthenticated && <Notifications />}

                {/* Login Button */}
                {isAuthenticated ? <span className="text-sm capitalize font-medium text-brand-yellow transition-colors hidden sm:block">{user?.name}</span> : (

                    <Link
                        href="/auth/login"
                        className="py-1 px-6 bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors hidden sm:block"
                    >
                        Login
                    </Link>
                )}

                {/* Profile/User Icon */}
                {isAuthenticated && <span className="p-1.5 border-2 border-white rounded-full relative cursor-pointer" ref={ref} onClick={() => setOpen(!open)}>
                    <UserRoundPen className="w-6 h-6 bg-brand-glass rounded-full" />

                </span>}
                {open &&
                    createPortal(
                        <UniversalContainer
                            size="sm"
                            className="absolute bottom-[74px]  py-2
                                           z-50 pointer-events-auto w-fit! px-auto  top-15 right-14 h-fit"
                            onClick={(e) => e.stopPropagation()} // ✅ prevents dropdown from closing early


                        >
                            <div className="flex flex-col py-2 items-center gap-1">
                                {isAuthenticated && <span
                                    className={`cursor-pointer text-[#F8FAFC] font-[600] text-[14px] leading-[20px] py-2 rounded-md   font-segoe   `}
                                    onClick={handleUser}
                                >
                                    My Account
                                </span>}
                                {/* <div className="border-t border-[#303036] my-1 w-full" />
                                <button
                                    className={`cursor-pointer text-[#F8FAFC] font-[600] flex items-center gap-1.5 text-[14px] leading-[20px] py-2 rounded-md hover:bg-white/5 font-segoe text-left  px-6`}
                                >
                                    <User size={16} /> <span> Profile</span>
                                </button>
                                <div className="border-t border-[#303036] my-1 w-full" />
                                <button
                                    className={`cursor-pointer text-[#F8FAFC] font-[600] flex items-center gap-1.5 text-[14px] leading-[20px] py-2 rounded-md hover:bg-white/5 font-segoe text-left  px-6`}
                                >
                                    <Settings size={16} /> <span> Settings</span>
                                </button>
                                <div className="border-t border-[#303036] my-1 w-full" />
                                <button
                                    className={`cursor-pointer text-[#F8FAFC] font-[600] flex items-center gap-1.5 text-[14px] leading-[20px] py-2 rounded-md hover:bg-white/5 font-segoe text-left  px-6`}
                                >
                                    <Shield size={16} /> <span> Admin Panel</span>
                                </button>
                                <div className="border-t border-[#303036] my-1" /> */}


                                <button
                                    className={`cursor-pointer px-2 text-[#DC2828] font-[600] flex items-center gap-1.5   text-[14px] leading-[20px] py-2 rounded-md hover:bg-white/5 font-segoe text-left  `}
                                    onClick={handleLogout}
                                >
                                    <LogOut />   Log out
                                </button>
                            </div>
                        </UniversalContainer>,
                        document.body
                    )}
                {/* Mobile Menu Icon (Show on small screens) */}
                <button
                    className="p-2 lg:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* ---------------------------------------------------------------------- */}
            {/* 3. Mobile Menu (Off-Canvas/Sidebar) */}
            {/* ---------------------------------------------------------------------- */}

            {/* Overlay */}
            {/* ✅ Overlay (for mobile) */}
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
                    aria-hidden="true"
                ></div>
            )}

            {/* ✅ Mobile Menu Panel */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-[#121824] shadow-2xl z-50 
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
              lg:hidden`}
            >
                {/* Header Section */}
                <div className="flex items-center h-20 px-2 mb-4 pb-2 border-b border-brand-gray justify-between">
                    <div className="flex items-center gap-1">
                        <img src="/svg/logo.svg" alt="Logo" />
                    </div>

                    {/* Close Button for Mobile */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-white lg:hidden hover:text-brand-yellow transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 flex flex-col space-y-2">
                    <Link href="/" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Cryptocurrencies
                    </Link>
                    <Link href="/community" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Community
                    </Link>
                    <Link href="/blogs" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Blogs
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-zinc-700 my-2"></div>

                    <Link href="/watchlist" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        <Star className="w-4 h-4 mr-2 inline-block" />
                        Watchlist
                    </Link>

                    <Link
                        href="/auth/login"
                        className="mt-4 py-2 text-center bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>
                </nav>
            </aside>


        </nav>
    );
};