import { formatDateTime } from '@/lib/helpers';
import Post from '../community/Post'
import Sentiments from '../community/Sentiments';
import { Dispatch, SetStateAction } from 'react';

const CoinViewRight = ({ coin, queryKey, coinType, setCoinType }: { coin: any; queryKey: [string, string], coinType: string, setCoinType: Dispatch<SetStateAction<string>> }) => {
    console.log({ coin })
    //     selectedCoin,
    // setiment,
    // isLoading,
    return (
        <div className="flex flex-col col-span-2">
            <div className="flex flex-col p-2 rounded-xl">
                <div className="space-y-6">
                    <Sentiments selectedCoin={{ _id: coin._id, coinName: coin.cryptoCoinName }} setiment={coin.sentiment} isLoading={false} />
                    <div className="grid grid-cols-1 md:grid-cols-2 font-inter gap-4 w-full text-[16px] bg-brand-black/50 font-inter rounded-2xl p-1 w-fit mx-auto">
                        <button className={`${coinType === "top"
                            ? "bg-[#0d0d0d] text-white"
                            : "text-brand-gray2 hover:text-white bg-transparent"
                            } font-semibold  px-6 py-2 rounded-xl`} onClick={() => setCoinType("top")}>
                            Top
                        </button>
                        <button className={`${coinType === "latest"
                            ? "bg-[#0d0d0d] text-white"
                            : "text-brand-gray2 hover:text-white bg-transparent"
                            } font-semibold  px-6 py-2 rounded-xl`} onClick={() => setCoinType("latest")}>
                            Latest
                        </button>
                    </div>
                    {coin.posts && coin.posts.length > 0 ? (
                        coin.posts.map((post: any, i: number) => (
                            <Post
                                key={i}
                                username={post.username}
                                time={formatDateTime(post.createdAt)}
                                title={post.content || "No title"} // use post.title if available
                                description={post.content}
                                image={post.images?.[0]} // first image if exists
                                active={post.userId?.status === "active"}
                                id={post._id}
                                comments={post.comments}
                                likes={post.likes}
                                shares={post.shares}
                                reposts={post.reposts}
                                selectedCoin={{ _id: coin._id, coinName: coin.cryptoCoinName }}
                                queryKey={queryKey}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center mt-4">No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CoinViewRight;