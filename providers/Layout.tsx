"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "@/providers/Providers";
import { AdminSidebar } from "@/components/layout/admin-sidebar/AdminSidebar";
import { AdminHeader } from "@/components/layout/admin-header/AdminHeader";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { UserNavbar } from "@/components/layout/navbar/UserNavbar";

const DESKTOP_BREAKPOINT = 1024;

// Public routes (accessible without login)

const getInitialSidebarState = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth >= DESKTOP_BREAKPOINT;
    }
    return false;
};


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/admin");
    const isUserRoute = pathname.startsWith("/user");

    const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                setIsSidebarOpen(true);
            }
            else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    if (isAdminRoute) {
        return (
            <Providers>
                <div className="flex flex-1 min-h-screen ">
                    <AdminSidebar
                        isOpen={isSidebarOpen}
                        setIsOpen={setIsSidebarOpen}
                    />
                    <div className={`flex-1 flex flex-col transition-all  custom-scrollbar overflow-y-auto   duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                        <AdminHeader
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                        <main className="flex-1   p-6 ">{children}</main>
                    </div>
                </div>
            </Providers>
        );
    }
    // if (isUserRoute) {
    //     return (
    //         <>
    //             <Providers>
    //                 <UserNavbar />
    //                 <main className="flex-grow">
    //                     {children}
    //                 </main>
    //                 <Footer />
    //             </Providers>
    //         </>
    //     );
    // }
    return (
        <>
            <Providers>
                <UserNavbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </Providers>
        </>
    );
}