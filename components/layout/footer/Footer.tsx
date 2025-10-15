'use client';

import { usePathname } from 'next/navigation';
import { FooterMenu } from './FooterMenu';
import { Copyright } from './Copyright';


export const Footer = () => {
    const pathname = usePathname();
    const isAuthPage = pathname.includes('/auth');
    return (
        <footer className="container max-w-[1800px] px-4 mx-auto text-muted pt-12 border-t border-brand-glass mt-12 ">
            {!isAuthPage && <FooterMenu />}
            <Copyright />
        </footer>
    );
};