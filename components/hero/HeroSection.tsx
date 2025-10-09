import { CoinSearch } from "./CoinSearch";
import { MarketWidgets } from "./MarketWidgets";
import { TickerTape } from "./TickerTape";


export const HeroSection = () => {
    return (
        // Main container with dark background
        <section className="pt-10">
            <div className="container mx-auto">

                {/* --- Hero Content Box (Matching the image) --- */}
                <div className="shadow-2xl flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Text, Search, and Widgets */}
                    <div className="space-y-6 w-full lg:w-1/3">

                        {/* Heading */}
                        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                            Detect New Crypto <br />
                            Coins With <span className="text-brand-yellow">Hot IDO,</span> <br />
                            IEO & ICO List
                        </h1>

                        {/* Description */}
                        <p className="text-brand-muted max-w-md">
                            Discover the next GEM having x20+ ROI potential with our ultimate database and in-depth scoring system.
                        </p>

                        {/* Search Bar Component */}
                        <CoinSearch />

                        {/* Market Widgets Component */}
                        <MarketWidgets />
                    </div>

                    {/* Right Column: Illustration and Call to Action */}
                    <div className="bg-brand-glass grid grid-cols-1 lg:grid-cols-2 gap-10 space-y-8 p-4 rounded-2xl w-full lg:w-2/3">
                        <div>
                            {/* Right Heading */}
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    Revolutionizing future in crypto and fintech
                                </h2>
                                <p className="text-brand-muted text-sm">
                                    The GOOD token sits at the center of a powerful, self-reinforcing flywheel.
                                </p>

                                <p className="text-brand-muted text-sm">
                                    As trading volume on goodcryptoX increases, so does platform revenue, driving higher revshare per token. This boosts the value and profitability of each GOOD token, fueling demand. Rising token value, in turn, makes trading rewards more attractive, bringing even more traders to the platform.
                                </p>
                            </div>


                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="py-2 px-6 font-bold text-black bg-brand-yellow rounded-lg hover:bg-yellow-400 transition-colors">
                                    Buy Token Now →
                                </button>
                                <button className="py-2 px-6 font-bold text-white border border-brand-muted rounded-lg hover:bg-gray-700 transition-colors">
                                    Revolutore dets
                                </button>
                            </div>
                        </div>

                        {/* Illustration (Placeholder) */}
                        <div className="flex justify-center items-center h-48 lg:h-auto">
                            <img src="/svg/hero.svg" alt="Hero Illustration" className="w-full h-full flex items-center justify-center" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Ticker Tape Component (Must be outside the main box) --- */}
            <TickerTape />
        </section>
    );
}