"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        { href: "/user/dashboard", label: "Dashboard" },
        { href: "/user/ico-listing", label: "My ICO Listing" },
        { href: "/user/submit-ico-listing", label: "Submit ICO Listing" },
        { href: "/user/downloads", label: "Downloads" },
    ];
    return (
        <aside className="flex h-fit flex-row md:flex-col w-full md:w-64 bg-brand-glass text-white rounded-lg">
            <ul>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`
                                block px-4 py-2 border-b border-brand-glass transition-colors duration-200
                                ${pathname === link.href
                                    ? "text-white bg-brand-primary rounded-md"
                                    : "text-brand-muted hover:text-white hover:bg-brand-primary/20"}
                            `}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}  </ul >
        </aside >
    );
};