import Link from 'next/link';
import { X, Check } from 'lucide-react';

interface ProjectRowProps {
    status: 'Presale/Whitelist' | 'Active' | 'Upcoming' | 'Past';
    project: string;
    industry: string;
    date: string;
    launchpad: string;
    fundRaised: string;
}

export const ProjectRow = ({ project, date, launchpad, fundRaised }: Omit<ProjectRowProps, 'status' | 'industry'>) => {
    const isAvailable = Math.random() > 0.5; // Mock availability

    return (
        <div className="grid grid-cols-11 items-center p-4 bg-brand-glass/70 rounded-lg mb-4">
            {/* Project (2 cols) */}
            <div className="col-span-1 text-white">{date}</div>
            <div className="col-span-2 flex items-center space-x-3 text-white">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
                <p className="font-medium">{project}</p>
            </div>

            {/* Date (1 col) */}
            <div className="col-span-1 text-white">{date}</div>
            <div className="col-span-1 text-white">22 Aug</div>
            <div className="col-span-1 text-white">23 Aug</div>

            {/* Launchpad (2 cols) */}
            <div className="col-span-2">
                <Link href="#" className="bg-brand-yellow text-black py-1 px-3 rounded-full text-xs">
                    Blockchain Vantureres
                </Link>
            </div>

            {/* Check/X (1 col) */}
            <div className="col-span-1 flex justify-center">
                {isAvailable
                    ? <Check size={35} className="text-white bg-brand-glass p-0.5 rounded-full" />
                    : <X size={35} className="text-brand-yellow bg-brand-glass p-0.5 rounded-full" />
                }
            </div>

            {/* Funds Raised (2 cols) */}
            <div className="col-span-2 flex justify-between items-center text-white">
                <span>{fundRaised}</span>
                <div className="text-xs text-right">
                    <p className="text-white font-medium">1.16977</p>
                    <p className="text-brand-yellow">(-0.0036)</p>
                </div>
            </div>
        </div>
    );
};