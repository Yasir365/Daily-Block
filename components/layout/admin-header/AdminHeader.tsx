"use client";

import Notifications from "@/components/dropdowns/Notification";

export const AdminHeader = () => {
    return (
        <header className="bg-brand-glass shadow p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <Notifications />

        </header>
    );
};
