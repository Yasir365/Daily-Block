"use client";

import { Menu } from 'lucide-react';
import Notifications from "@/components/dropdowns/Notification";
import InputField from "@/components/ui/Input";

type AdminHeaderProps = {
    setIsSidebarOpen: (isOpen: boolean) => void;
};

export const AdminHeader = ({ setIsSidebarOpen }: AdminHeaderProps) => {
    return (
        <header className="bg-brand-glass shadow p-4 flex justify-between items-center">
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:text-brand-yellow transition-colors"
                aria-label="Open sidebar"
            >
                <Menu className="w-6 h-6" />
            </button>

            <InputField
                label=""
                name="search"
                value=""
                placeholder="Search..."
                onChange={() => { }}
                className="max-w-xs ml-4"
            />
            <Notifications />
        </header>
    );
};