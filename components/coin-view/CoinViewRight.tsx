import Post from '../community/Post'
import Sentiments from '../community/Sentiments';

const CoinViewRight = () => {
    return (
        <div className="flex flex-col col-span-2">
            <div className="flex flex-col p-2 rounded-xl">
                <div className="space-y-6">
                    <Sentiments />
                    <div className="grid grid-cols-1 md:grid-cols-2 font-inter gap-4 w-full text-[16px] bg-brand-black/50 font-inter rounded-2xl p-1 w-fit mx-auto">
                        <button className="bg-[#0d0d0d] text-white font-semibold  px-6 py-2 rounded-xl">
                            Top
                        </button>
                        <button className="text-brand-gray2 px-6 py-2 rounded-xl hover:text-white">
                            Latest
                        </button>
                    </div>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Post
                            username="Crypto King25"
                            time="1 hour ago"
                            title="Bitcoin ETF Growth Accelerates"
                            description="Spot Bitcoin ETFs attracted $7.8B in inflows during Q3, bringing total inflows to $21.5B year-to-date and $57B since inception."
                            image="svg/community/market.svg"
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CoinViewRight;