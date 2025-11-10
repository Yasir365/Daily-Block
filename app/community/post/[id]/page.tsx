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
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    console.log({ id })
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();

    // ✅ Fetch posts via TanStack
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`/api/community/posts/${id}`);
            if (!res.ok) throw new Error("Failed to fetch posts");
            return res.json();
        },
        enabled: !!id, // only fetch when id is ready
    });
    const post = data?.post || [];
    console.log({ post })

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400">
                Loading posts...
            </div>
        );

    if (isError)
        return (
            <div className="flex justify-center items-center min-h-screen text-red-400">
                Failed to load posts.
            </div>
        );

    return (
        <div className="text-white container mx-auto flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col gap-6 py-4 px-3 md:px-6">
                {/* 📝 Create Post Section */}
                {/* {isAuthenticated && <Header coins={coins} userSelectedCoin={id as string} />} */}

                {/* 📰 Posts Feed */}
                <div className="flex flex-col gap-4">
                    <Post
                        key={post._id}
                        id={post._id}
                        username={post.userId.firstName + " " + post.userId.lastName} // or post.username
                        time={post.createdAt} // you can format with dayjs/moment
                        title={post.coin.cryptoCoinName} // if title is coin name
                        description={post.content}
                        image={post.images[0] || post.coin.icoIcon} // first post image or coin icon
                        active={true} // if you track active post
                        comments={post.comments}
                        selectedCoin={post.coin} // whole coin object
                        likes={post.likes}
                        shares={post.shares}
                        reposts={post.reposts}
                        queryKey={["post", post._id]}
                    />
                    {/* {posts.length > 0 ? (
                        posts.map((post: any) => (
                        ))
                    ) : (
                        <div className="text-gray-400 text-center py-8">
                            No posts found yet.
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}