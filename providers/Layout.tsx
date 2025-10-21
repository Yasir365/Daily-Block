"use client";

import { usePathname } from "next/navigation";
import { Providers } from "@/providers/Providers";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { AdminHeader } from "@/components/layout/admin-header/AdminHeader";
import { AdminSidebar } from "@/components/layout/admin-sidebar/AdminSidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
        return (
            <Providers>
                <div className="flex flex-1 min-h-screen">
                    <AdminSidebar />
                    <div className="flex-1 flex flex-col  ml-64">
                        <AdminHeader />
                        <main className="flex-1 overflow-y-auto  p-6 ">{children}</main>
                    </div>
                </div>
            </Providers>
        );
    }

    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Providers>{children}</Providers>
            </main>
            <Footer />
        </>
    );
}
