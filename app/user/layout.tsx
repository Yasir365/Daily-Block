"use client";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children, }: { children: React.ReactNode; }) {
    const { user, isAuthenticated, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.type !== "user") {
                router.push("/"); // only redirect AFTER loading finishes
            }
        }
    }, [isAuthenticated, user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }
    return (
        <div className="container mx-auto flex flex-col md:flex-row gap-8 mt-6  p-4">
            <Sidebar />
            {children}
        </div>
    );
}
