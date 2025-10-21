"use client";

import Notifications from "@/components/dropdowns/Notification";
import InputField from "@/components/ui/Input";

export const AdminHeader = () => {
    return (
        <header className="bg-brand-glass shadow p-4 flex justify-between items-center">
            <InputField
                label=""
                name="search"
                value=""
                placeholder="Search..."
                onChange={() => { }}
            />
            <Notifications />

        </header>
    );
};
