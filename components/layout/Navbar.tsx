"use client";
import Link from "next/link";
import { Search, Star, Moon, Menu, Bell, UserRoundPen } from 'lucide-react'; // Icons: Ensure you have 'lucide-react' installed

export const Navbar = () => {
    return (
        <nav className="py-2 px-4 md:px-12 flex justify-between items-center text-brand-muted">

            {/* 1. Left Section: Logo & Main Navigation Links */}
            <div className="flex items-center space-x-6">

                {/* Logo */}
                <Link href="/" className="flex items-center text-xl font-extrabold text-[#fec84e]">
                    <img src="/svg/logo.svg" alt="DailyBlock" className="h-8" />
                </Link>

                {/* Navigation Links (Hidden on small screens) */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium hover:text-[#fec84e] transition-colors">
                        Cryptocurrencies
                    </Link>
                    <Link href="/community" className="text-sm font-medium hover:text-[#fec84e] transition-colors">
                        Community
                    </Link>
                    <Link href="/blogs" className="text-sm font-medium hover:text-[#fec84e] transition-colors">
                        Blogs
                    </Link>
                </div>
            </div>

            {/* 2. Right Section: Controls, Login, and Menu Icon */}
            <div className="flex items-center space-x-3">

                {/* Watchlist & Search Bar */}
                <div className="hidden md:flex items-center space-x-3 rounded-lg p-2">

                    {/* Watchlist */}
                    <button className="flex items-center text-sm font-medium hover:text-white transition-colors rounded-md p-1">
                        <Star className="w-4 h-4 mr-1 text-[#fec84e]" />
                        Watchlist
                    </button>

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

                {/* Icons (Theme Toggle & Other Controls) */}
                <div className="flex items-center space-x-2">
                    {/* Theme Toggle Button (Dark/Light mode) */}
                    <button className="p-2 hover:bg-brand-yellow rounded-full transition-colors">
                        <Moon className="w-5 h-5 text-white" />
                    </button>

                    {/* Placeholder for Notification/Other Icon */}
                    <button className="p-2 hover:bg-brand-yellow rounded-full transition-colors hidden sm:block">
                        <Bell className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Login Button */}
                <Link
                    href="/auth/login"
                    className="py-1 px-6 bg-[#fec84e] text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors hidden sm:block"
                >
                    Login
                </Link>

                {/* Profile/Menu Icon */}
                <button className="p-1.5 border-2 border-white rounded-full">
                    <UserRoundPen className="w-6 h-6 bg-gray-600 rounded-full" />
                </button>

                {/* Mobile Menu Icon (Show on small screens) */}
                <button className="p-2 lg:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};