import Post from '../community/Post'

const CoinViewRight = () => {
    return (
        <div className="flex flex-col col-span-2">
            <div className="flex flex-col p-2 rounded-xl">
                <div className="space-y-6">

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