'use client';
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./ProjectCard";
import { useNewlyListed } from "@/hooks/useListedCoints";

async function fetchNewlyListed({ queryKey }: any) {
  const [_key, { status }] = queryKey;

  const qs = status ? `?status=${status}` : ""; // optional status param
  const res = await fetch(`/api/dashboard/newlyListed${qs}`);

  return res.json();
}

async function fetchTopRanked() {
  const res = await fetch("/api/dashboard/topRanked");
  return res.json();
}

export const ProjectCardsSection = () => {
  const { data: listed, isLoading: loadingListed } = useNewlyListed("approved");


  const { data: ranked, isLoading: loadingRanked } = useQuery({
    queryKey: ["top-ranked"],
    queryFn: fetchTopRanked,
  });

  const listedCoins = (listed?.data || []).slice(0, 6);
  const topRankedCoins = (ranked?.coins || []).slice(0, 6);

  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Top ICO/IEO/IDO Projects */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            Top ICO/IEO/IDO Projects <span className="ml-2 text-2xl">🔥</span>
          </h3>

          <div className="space-y-4">
            <ProjectCard name="Sample Project" isTopProject={true} />
          </div>
        </div>

        {/* Column 2: Newly Listed Coins */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Newly Listed Coins</h3>
          <div className="space-y-4">
            {loadingListed ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              listedCoins.map((coin: any) => (
                <ProjectCard
                  key={coin._id}
                  name={coin.cryptoCoinName}
                  _id={coin._id}
                  logoUrl={coin.icoIcon}
                  abbrv={coin.coinAbbreviation}
                />
              ))
            )}
          </div>
        </div>

        {/* Column 3: Top Ranking Coins */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Top Ranking Coins</h3>
          <div className="space-y-4">
            {loadingRanked ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              topRankedCoins.map((coin: any) => (
                <ProjectCard key={coin._id} name={coin.name} />
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
