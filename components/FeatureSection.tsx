import { ArrowRight } from "lucide-react";

export const FeatureSection = () => {
    return (
        <div className='container  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12'>
            <div className="lg:pr-10">
                {/* Top Block */}
                <h2 className="text-2xl md:text-5xl font-bold leading-tight text-white mb-6 font-titilliumWeb">
                    Be The First to Find New <br />
                    Crypto Projects With Daily Block
                </h2>

                <p className="text-gray-400 mb-8 font-inter text-[16px]">
                    Welcome to Daily Block - one of the greatest crypto databases of the latest and current token launches. After being in the crypto industry for 7 long years, we have noticed a significant gap in the market when it comes to finding reliable and comprehensive information sources that provide a holistic view of the market, and especially new crypto listings. So we decided to take matters into our own hands and bridge this gap by creating a platform that can offer insightful and data-driven analysis of the latest IDO, ICO, IEO projects, crypto launchpads, funds, influencers and other related events in the crypto market.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    {/* <button className="py-2 px-6 font-bold text-black bg-brand-yellow rounded-lg hover:bg-yellow-400 transition-all duration-300 font-mulish flex items-center justify-center gap-2">
                        Buy Token Now
                        <span className="inline-block font-semibold transform rotate-[-30deg] transition-transform duration-300 group-hover:-translate-y-1">
                            <ArrowRight size={19} strokeWidth={1.5} />
                        </span>
                    </button> */}

                    <button className="py-2 px-6 font-bold text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                        Revolutore stats
                    </button>
                </div>
            </div>

            <div className='flex justify-center lg:justify-end'>
                <img src="/svg/locks.svg" alt="" />
            </div>
        </div>
    );
};