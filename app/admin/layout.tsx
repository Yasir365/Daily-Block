"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated ,loading} = useAuthContext();
    const router = useRouter();

       useEffect(() => {
            if (!loading) {
                if (!isAuthenticated || user?.type !== "admin") {
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
  

    return <>{children}</>;
}
