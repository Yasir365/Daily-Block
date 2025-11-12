"use client";
import CoinCard from "@/components/community/CoinCard";
import CoinDetails from "@/components/community/CoinDetails";
import Header from "@/components/community/Header";
import MarketCap from "@/components/community/MarketCap";
import Sentiments from "@/components/community/Sentiments";
import Post from "@/components/community/Post";
import { CoinCardDetail, MarketWatch } from "@/components/coin-view/CoinViewLeft";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useIcoProjects } from "@/hooks/useIcoProjects";
import { formatDateTime } from "@/lib/helpers";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();
    const [selectedCoin, setSelectedCoin] = useState({ _id: "", coinName: "" });
    const [sort, setSort] = useState<"top" | "latest">("latest"); // default sort

    const { data: posts = [] } = useQuery({
        queryKey: ["posts", selectedCoin._id, sort],
        queryFn: async () => {
            const response = await fetch(`/api/community/${selectedCoin._id || undefined}/posts?sort=${sort}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            return data;
        },
    });
    const { data: projects = [], isLoading, isError, error } = useIcoProjects("approved");
    const { data: setiment, isLoading: sentimentLoading, isError: sentimentIsError, error: sentimentError } = useQuery({
        queryKey: ["sentiment", selectedCoin._id],
        queryFn: async () => {
            if (!selectedCoin) return null; // don't call API if no coin is selected

            const res = await fetch(`/api/community/${selectedCoin._id}/sentiment`);
            if (!res.ok) throw new Error("Failed to fetch sentiment data");
            return res.json();
        },
        enabled: !!selectedCoin._id, // only fetch when a coin is selected
        refetchInterval: 8 * 60 * 60 * 1000, // auto-refresh every 8 hours
    });
    // Handle tab change
    const handleSortChange = (newSort: "top" | "latest") => {
        setSort(newSort);
        // query automatically refetches because of the queryKey dependency
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!isAuthenticated) {
    //             router.replace("/auth/login");
    //         }
    //     }, 2000)

    // }, [isAuthenticated, router]);

    // if (!isAuthenticated) {
    //     return null; // prevent rendering before redirect
    // }
    return (
        <div className="text-white container mx-auto flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 h-[fit-content] p-4 bg-brand-glass rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Coin Community</h2>
                <div className="space-y-3">
                    {projects && projects?.map((project: any) => (
                        <CoinCard selectedCoin={selectedCoin} name={project.coinAbbreviation} _id={project._id} setSelectedCoin={setSelectedCoin} key={project.coinAbbreviation} />
                    ))}
                </div>
            </aside>

            {/* Main Feed */}
            <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
                <Header coins={projects} userSelectedCoin={selectedCoin._id} />

                {/* Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-2 font-inter gap-4 w-full text-[16px] bg-brand-black font-inter rounded-2xl p-1 w-fit mx-auto">
                    <button
                        className={`px-6 py-3 rounded-xl font-semibold ${sort === "top" ? "bg-brand-yellow text-black" : "text-brand-gray2 hover:text-white"}`}
                        onClick={() => handleSortChange("top")}
                    >
                        Top
                    </button>
                    <button
                        className={`px-6 py-3 rounded-xl ${sort === "latest" ? "bg-brand-yellow text-black font-semibold" : "text-brand-gray2 hover:text-white"}`}
                        onClick={() => handleSortChange("latest")}
                    >
                        Latest
                    </button>
                </div>

                {/* Posts */}
                <div className="space-y-6">
                    {posts && posts.map((post: any, i: number) => (
                        <Post
                            key={i}
                            username={post.username}
                            time={formatDateTime(post.createdAt)}
                            title="Bitcoin ETF Growth Accelerates"
                            description={post.content}
                            image={post.images[0]}
                            active={post.userId.status === "active"}
                            id={post._id}
                            comments={post.comments}
                            likes={post.likes}
                            shares={post.shares}
                            reposts={post.reposts}
                            selectedCoin={selectedCoin}
                        />
                    ))}



                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-full md:w-120 p-4 space-y-4">
                <Sentiments selectedCoin={selectedCoin} setiment={setiment} isLoading={sentimentLoading} />
                <CoinCardDetail />
                <MarketWatch />
                <MarketCap />
            </aside>
        </div>
    );
}