import CoinCard from "@/components/community/CoinCard";
import CoinDetails from "@/components/community/CoinDetails";
import Header from "@/components/community/Header";
import MarketCap from "@/components/community/MarketCap";
import Sentiments from "@/components/community/Sentiments";
import Post from "@/components/community/Post";
import { CoinCardDetail, MarketWatch } from "@/components/coin-view/CoinViewLeft";

export default function Page() {
    return (
        <div className="text-white container mx-auto flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 h-[fit-content] p-4 bg-brand-glass rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Coin Community</h2>
                <div className="space-y-3">
                    <CoinCard name="Maxi Doge" />
                    <CoinCard name="Zephyr" />
                    <CoinCard name="Bitcoin Hyper" />
                    <CoinCard name="Wall Street Hyper" />
                    <CoinCard name="Smorter Token Bot" />
                </div>
            </aside>

            {/* Main Feed */}
            <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
                <Header />

                {/* Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-2 font-inter gap-4 w-full text-[16px] bg-brand-black font-inter rounded-2xl p-1 w-fit mx-auto">
                    <button className="bg-brand-yellow text-black font-semibold  px-6 py-3 rounded-xl">
                        Top
                    </button>
                    <button className="text-brand-gray2 px-6 py-3 rounded-xl hover:text-white">
                        Latest
                    </button>
                </div>

                {/* Posts */}
                <div className="space-y-6">
                    <Post
                        username="Crypto King25"
                        time="1 hour ago"
                        title="Bitcoin ETF Growth Accelerates"
                        description="Spot Bitcoin ETFs attracted $7.8B in inflows during Q3, bringing total inflows to $21.5B year-to-date and $57B since inception."
                        image="svg/community/market.svg"
                    />

                    <Post
                        username="Crypto Feed News"
                        time="1 hour ago"
                        title="Bitcoin ETF Growth Accelerates"
                        description="Spot Bitcoin ETFs attracted $7.8B in inflows during Q3, bringing total inflows to $21.5B year-to-date and $57B since inception."
                        image="svg/community/market.svg"
                    />
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-full md:w-120 p-4 space-y-4">
                <Sentiments />
                <CoinCardDetail />
                <MarketWatch />
                <MarketCap />
            </aside>
        </div>
    );
}