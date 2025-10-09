import Link from "next/link";

export const Sidebar = () => {
    return (
        <aside className="flex flex-row md:flex-col w-full md:w-64 bg-brand-glass text-white rounded-lg">
            <ul>
                <Link href="/user/dashboard"><li className="px-4 py-2 text-brand-muted border-b border-brand-glass">Dashboard</li></Link>
                <Link href="/user/ico-listing"><li className="px-4 py-2 text-brand-muted border-b border-brand-glass">My ICO Listing</li></Link>
                <Link href="/user/submit-ico-listing"><li className="px-4 py-2 text-brand-muted border-b border-brand-glass">Submit ICO Listing</li></Link >
                <Link href="/user/downloads"><li className="px-4 py-2 text-brand-muted">Downloads</li></Link >
            </ul >
        </aside >
    );
};