"use client";
import { useState } from 'react';
import Link from "next/link";
import { Search, Star, Moon, Menu, UserRoundPen, X } from 'lucide-react';
import Notifications from '@/components/dropdowns/Notification';


export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkStyle = "text-sm font-medium hover:text-brand-yellow transition-colors block py-2 px-4";

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

                {/* Icons (Theme Toggle & Other Controls) */}
                <div className="flex items-center space-x-2">
                    {/* Theme Toggle Button (Dark/Light mode) */}
                    <button className="p-2 hover:bg-brand-yellow rounded-full transition-colors">
                        <Moon className="w-5 h-5 text-white" />
                    </button>

                    {/* Notification Icon with Dropdown and Badge */}
                    <Notifications />
                </div>

                {/* Login Button */}
                <Link
                    href="/auth/login"
                    className="py-1 px-6 bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors hidden sm:block"
                >
                    Login
                </Link>

                {/* Profile/User Icon */}
                <button className="p-1.5 border-2 border-white rounded-full">
                    <UserRoundPen className="w-6 h-6 bg-brand-glass rounded-full" />
                </button>

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
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                onClick={() => setIsMenuOpen(false)} // Close menu when clicking outside
            ></div>

            {/* Menu Panel */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
                <div className="p-4 flex flex-col space-y-2 pt-16">
                    {/* Mobile Navigation Links */}
                    <Link href="/" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Cryptocurrencies
                    </Link>
                    <Link href="/community" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Community
                    </Link>
                    <Link href="/blogs" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        Blogs
                    </Link>

                    {/* Mobile Specific Items */}
                    <div className="h-px bg-zinc-700 my-2"></div>
                    <Link href="/watchlist" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
                        <Star className="w-4 h-4 mr-2 inline-block" />
                        Watchlist
                    </Link>
                    <Link href="/auth/login" className="mt-4 mx-4 py-2 text-center bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                        Login
                    </Link>
                </div>
            </div>

        </nav>
    );
};