'use client';
import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectCardsSection = () => {
  const [listedCoins, setListedCoins] = useState<any[]>([]);
  const [topRankedCoins, setTopRankedCoins] = useState<any[]>([]);
  const [loadingListed, setLoadingListed] = useState(true);
  const [loadingRanked, setLoadingRanked] = useState(true);

  useEffect(() => {
    async function fetchLatestCoins() {
      try {
        const res = await fetch("/api/dashboard/newlyListed");
        const data = await res.json();
        setListedCoins((data.coins || []).slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch newly listed coins:", err);
      } finally {
        setLoadingListed(false);
      }
    }
    fetchLatestCoins();
  }, []);

  useEffect(() => {
    async function fetchTopRanked() {
      try {
        const res = await fetch("/api/dashboard/topRanked");
        const data = await res.json();
        setTopRankedCoins((data.coins || []).slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch top ranked coins:", err);
      } finally {
        setLoadingRanked(false);
      }
    }
    fetchTopRanked();
  }, []);

  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Top ICO/IDO/IEO Projects */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            Top ICO/IEO/IDO Projects <span className="ml-2 text-2xl">🔥</span>
          </h3>
          <div className="space-y-4">
            <ProjectCard name="Sample Project" isTopProject={true} />
            {/* Replace with API call later */}
          </div>
        </div>

        {/* Column 2: Newly Listed Coins */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Newly Listed Coins</h3>
          <div className="space-y-4">
            {loadingListed ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              listedCoins.map((coin, index) => (
                <ProjectCard key={index} name={coin.name} />
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
              topRankedCoins.map((coin, index) => (
                <ProjectCard key={index} name={coin.name} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};