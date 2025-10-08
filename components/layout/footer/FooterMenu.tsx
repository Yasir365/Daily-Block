import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Instagram, Youtube, Rss, Globe } from 'lucide-react';

interface FooterLink {
    name: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: 'General',
        links: [
            { name: 'Market', href: '#' },
            { name: 'Community', href: '#' },
            { name: 'Blog', href: '/blogs' },
            { name: 'About', href: '#' },
        ],
    },
    {
        title: 'Product',
        links: [
            { name: 'Sparks', href: '#' },
            { name: 'Newsflow', href: '#' },
            { name: 'Trading Views', href: '#' },
            { name: 'Courses', href: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { name: 'Streams', href: '#' },
            { name: 'Ideas', href: '#' },
            { name: 'Chat', href: '#' },
            { name: 'House Rules', href: '#' },
        ],
    },
    {
        title: 'Information',
        links: [
            { name: 'API', href: '#' },
            { name: 'Terms and Conditions', href: '#' },
            { name: 'Privacy Policy', href: '#' },
        ],
    },
];

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Rss, href: '#', label: 'RSS Feed' },
    { icon: Globe, href: '#', label: 'Global' },
];

export const FooterMenu = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[2fr_3fr_1.5fr] gap-8 pb-12">

            {/* 1. Logo and Description */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
                {/* Logo - assuming you have a component or direct image */}
                <img src="/svg/logo.svg" alt="DailyBlock Logo" className='mb-2' />

                <p className="text-brand-muted text-sm max-w-xs">
                    Since then, the company has grown organically to: Starts up is the world's largest trading platform, with $12 billion worth of currency trading and 500,000 tickets sold daily to tens of thousands of traders worldwide.
                </p>
            </div>

            {/* 2. Navigation Links Grid */}
            <div className="col-span-1 md:col-span-3 lg:col-span-1 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8">
                {footerSections.map((section) => (
                    <div key={section.title}>
                        <h4 className="text-brand-muted font-semibold mb-4">{section.title}</h4>
                        <ul className="space-y-3">
                            {section.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-brand-muted hover:text-brand-yellow-500 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 3. Contact Information */}
            <div className="col-span-1 md:col-span-4 lg:col-span-1 lg:text-right">
                <address className="not-italic text-brand-muted text-sm mb-4">
                    Grayson Lane 6212-646 Wortund, Palarim.
                </address>
                <div className="space-y-2 text-sm">
                    <a href="mailto:hello@transparent.co" className="text-brand-muted hover:text-brand-yellow-500 block">hello@transparent.co</a>
                    <a href="tel:310-437-2766" className="text-brand-muted hover:text-brand-yellow-500 block">310-437-2766</a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-start lg:justify-end space-x-4 mt-6">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Link to DailyBlock's ${social.label}`}
                            className="text-brand-muted hover:text-brand-yellow-500 transition-colors"
                        >
                            <social.icon size={18} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};