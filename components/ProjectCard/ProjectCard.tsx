import Link from 'next/link';

interface ProjectCardProps {
    name: string;
    description?: string;
    logoUrl?: string;
    isTopProject?: boolean;
}

export const ProjectCard = ({ name, description, isTopProject = false }: ProjectCardProps) => {
    return (
        <div className="flex items-center justify-between px-3 py-4 rounded-xl bg-brand-glass ">
            <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isTopProject ? 'bg-yellow-500/20' : 'bg-gray-600'}`}>

                    <img src="/svg/icons/smile.svg" alt="" className="w-8 h-8" />
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isTopProject ? 'bg-yellow-500/20' : 'bg-gray-600'}`}>
                    <span className="text-lg font-bold text-white">Z</span>
                </div>
                <div>
                    <p className="text-white font-medium text-sm">{name}</p>
                    {description && <p className="text-gray-400 text-xs">{description}</p>}
                </div>
            </div>

            <Link href="/coin-view" className="flex items-center bg-brand-yellow text-black text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-400 transition-colors" >
                Project
            </Link>
        </div>
    );
};