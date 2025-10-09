import { ProjectCard } from "./ProjectCard";

// Mock data
const mockTopProjects = [
    { name: "GoodbyWxl", isTopProject: true },
    { name: "Zupiler" },
    { name: "Shaba Minguz" },
    { name: "Wal-Street Peop" },
    { name: "Greaner Salon Baz" },
    { name: "Mad Bags" },
];
const mockListedCoins = [
    { name: "Warden Prosol" },
    { name: "Falcon Finance" },
    { name: "POPENODE" },
    { name: "Lambert Finance" },
    { name: "Paradise" },
    { name: "Evelyn" },
];

export const ProjectCardsSection = () => {
    return (
        <section className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Column 1: Top ICO/IDO/IEO Projects */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        Top ICO/IEO/IDO Projects <span className="ml-2 text-2xl">🔥</span>
                    </h3>
                    <div className="space-y-4">
                        {mockTopProjects.map((p, index) => (
                            <ProjectCard key={index} name={p.name} isTopProject={p.isTopProject} />
                        ))}
                    </div>
                </div>

                {/* Column 2: Newly Listed Coins */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6">Newly Listed Coins</h3>
                    <div className="space-y-4">
                        {mockListedCoins.map((p, index) => (
                            <ProjectCard key={index} name={p.name} />
                        ))}
                    </div>
                </div>

                {/* Column 3: Top Ranking Coins (Same as Newly Listed, just different title) */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6">Top Ranking Coins</h3>
                    <div className="space-y-4">
                        {mockListedCoins.map((p, index) => (
                            <ProjectCard key={index} name={p.name} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};