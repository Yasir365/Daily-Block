"use client";

import { Menu } from "lucide-react";
import Notifications from "@/components/dropdowns/Notification";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import InputField from "@/components/ui/Input";

type AdminHeaderProps = {
    setIsSidebarOpen: (isOpen: boolean) => void;
};

export const AdminHeader = ({ setIsSidebarOpen }: AdminHeaderProps) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Debounce query updates
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(handler);
    }, [query]);

    // Fetch search results using debouncedQuery
    const { data, isLoading } = useQuery({
        queryKey: ["global-search", debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return null;
            const res = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
            return res.json();
        },
        enabled: !!debouncedQuery,
    });

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Hide dropdown after selecting an item
    const handleSelect = () => {
        setIsFocused(false);
        setQuery("");
        setDebouncedQuery("");
    };

    return (
        <header className="bg-brand-glass shadow p-4 flex justify-between items-center relative">
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:text-brand-yellow transition-colors cursor-pointer"
                aria-label="Open sidebar"
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-md ml-4" ref={dropdownRef}>
                <InputField
                    lblHide={true}
                    label=""
                    name="search"
                    value={query}
                    placeholder="Search users, blogs, ICOs, FAQs..."
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full"
                />

                {/* Search Results Dropdown */}
                {isFocused && debouncedQuery && data?.success && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#0F1117] border border-gray-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
                        {Object.entries(data.results).map(([key, items]: any) =>
                            items.length > 0 ? (
                                <div key={key} className="mb-2">
                                    <h4 className="text-xs uppercase text-gray-400 mb-1 px-2 font-semibold">{key}</h4>
                                    {items.map((item: any) => {
                                        let displayText = "";

                                        switch (key) {
                                            case "faqs":
                                                displayText = item.question;
                                                break;
                                            case "users":
                                                displayText = `${item.firstName} ${item.lastName}`;
                                                break;
                                            case "blogs":
                                                displayText = item.title;
                                                break;
                                            case "icto-management":
                                                displayText = item.cryptoCoinName;
                                                break;
                                            case "newsletter":
                                                displayText = item.email;
                                                break;
                                            default:
                                                displayText = item.name || "";
                                                break;
                                        }

                                        return (
                                            <Link
                                                key={item._id}
                                                href={`/admin/${key}`} // adjust routes as needed
                                                className="block px-2 py-1 rounded hover:bg-gray-800 cursor-pointer text-sm"
                                                onClick={handleSelect}
                                            >
                                                {displayText}
                                            </Link>
                                        );
                                    })}

                                </div>
                            ) : null
                        )}

                        {isLoading && <div className="p-2 text-gray-400">Searching...</div>}
                        {!isLoading &&
                            Object.values(data.results).every((arr: any) => arr.length === 0) && (
                                <div className="p-2 text-gray-500">No results found</div>
                            )}
                    </div>
                )}
            </div>

            <Notifications />
        </header>
    );
};
