import Link from 'next/link';
import { X, Check } from 'lucide-react';
import CircularProgress from '../ui/CircularProgressBar';

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
            <div className="col-span-1 text-white">
                <CircularProgress value={100} size={40} strokeWidth={5} color="#ffffff"
                />

            </div>
            <div className="col-span-2 flex items-center space-x-3 text-white">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
                <p className=" font-lato font-semibold tracking-tight">{project}</p>
            </div>

            {/* Date (1 col) */}
            <div className="col-span-1 text-white font-lato font-semibold tracking-tight">{date}</div>
            <div className="col-span-1 text-white font-lato font-semibold tracking-tight">22 Aug</div>
            <div className="col-span-1 text-white font-lato font-semibold tracking-tight">23 Aug</div>

            {/* Launchpad (2 cols) */}
            <div className="col-span-2">
                <Link href="/watchlist/detail" className="bg-brand-yellow text-black py-2 px-3 rounded-md text-sm font-mulish font-bold ">
                    Blockchain Infrastructure
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
                <span className='font-lato font-semibold tracking-tight'>{fundRaised}</span>
                <span className='flex gap-4'>

                    <CircularProgress value={60} size={50} strokeWidth={6} />
                    <div className="text-xs mt-3 text-right items-center">
                        <p className="text-white font-medium">1.16977</p>
                        <p className="text-brand-yellow">(-0.0036)</p>
                    </div>
                </span>
            </div>
        </div >
    );
};