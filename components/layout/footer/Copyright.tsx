import Link from 'next/link';


export const Copyright = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t border-gray-700 mt-4 py-4 text-sm flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">

            {/* Copyright */}
            <p className="text-brand-muted">
                Daily Block © {currentYear}. All Rights Reserved
            </p>

            {/* Policy Links */}
            <div className="space-x-4">
                <Link href="#" className="text-brand-muted hover:text-brand-yellow-500 transition-colors">
                    Privacy
                </Link>
                <span className="text-brand-muted">•</span>
                <Link href="#" className="text-brand-muted hover:text-brand-yellow-500 transition-colors">
                    Terms
                </Link>
            </div>
        </div>
    );
};