import { Sidebar } from "@/components/layout/sidebar/sidebar";

export default function UserLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="container mx-auto flex flex-col md:flex-row gap-8 mt-6  p-4">
            <Sidebar />
            {children}
        </div>
    );
}
