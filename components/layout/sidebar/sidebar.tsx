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
        <aside className="w-full md:w-64 md:h-fit bg-brand-glass text-white rounded-lg">
            <ul
                className="
      flex flex-row md:flex-col 
      overflow-x-auto md:overflow-visible 
      no-scrollbar
      w-full
    "
            >
                {links.map((link) => (
                    <li
                        key={link.href}
                        className="
          flex-shrink-0 md:flex-shrink 
          w-fit md:w-auto 
        "
                    >
                        <Link
                            href={link.href}
                            className={`
            block text-center md:text-left 
            px-4 py-2
            border-r md:border-r-0 md:border-b border-brand-glass
            whitespace-nowrap
            transition-colors duration-200
            ${pathname === link.href
                                    ? "text-white bg-brand-primary rounded-md"
                                    : "text-brand-muted hover:text-white hover:bg-brand-primary/20"
                                }
          `}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>


    );
};