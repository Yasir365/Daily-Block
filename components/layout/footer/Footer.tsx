'use client';

import { usePathname } from 'next/navigation';
import { FooterMenu } from './FooterMenu';
import { Copyright } from './Copyright';


export const Footer = () => {
    const pathname = usePathname();
    const isAuthPage = pathname.includes('/auth');
    return (
        <footer className="text-muted pt-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                {!isAuthPage && <FooterMenu />}
                <Copyright />
            </div>
        </footer>
    );
};