import { CoinSearch } from "./CoinSearch";
import { MarketWidgets } from "./MarketWidgets";
import { TickerTape } from "./TickerTape";


export const HeroSection = () => {
    return (
        // Main container with dark background
        <section className="pt-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">

                {/* --- Hero Content Box (Matching the image) --- */}
                <div className="p-6 md:p-10 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Left Column: Text, Search, and Widgets */}
                        <div className="space-y-6">

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
                        <div className="bg-brand-glass flex flex-col justify-between space-y-8 p-4 rounded-2xl">

                            {/* Right Heading */}
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    Revolutionizing future in crypto and fintech
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    The GOOD token sits at the center of a powerful, self-reinforcing flywheel. As trading volume on goods.crypto grows, so does platform revenue, driving higher reward per token. This boosts the value and profitability of each GOOD token, fueling demand. Rising token value, in turn, makes trading rewards more attractive, bringing even more traders to the platform.
                                </p>
                            </div>

                            {/* Illustration (Placeholder) */}
                            <div className="flex justify-center items-center h-48 lg:h-auto">
                                {/* Replace with your actual SVG component or Image component */}
                                <div className="w-full h-full bg-gray-700/50 rounded-lg flex items-center justify-center">
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="py-3 px-6 font-bold text-black bg-brand-yellow rounded-lg hover:bg-yellow-400 transition-colors">
                                    Buy Token Now →
                                </button>
                                <button className="py-3 px-6 font-bold text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                                    Revolutore dets
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Ticker Tape Component (Must be outside the main box) --- */}
            <TickerTape />
        </section>
    );
}