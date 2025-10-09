import Link from 'next/link';
import { Accordion } from './Accordion';

const faqData = [
    { title: "The Difference Between ICO and IDO Listings", content: "The strength and credibility of the **team** and their track record in the blockchain industry. Details on the difference..." },
    { title: "How Does Daily Block Rate Upcoming Crypto Projects?", content: "Details on the rating process..." },
    { title: "Where Can You Find the Latest News About Upcoming Crypto Coins?", content: "Details on news sources..." },
    { title: "How to Find New Crypto Projects Early?", content: "Details on early discovery..." },
];

export const FAQSection = () => {
    return (
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 mb-12'>
            {/* Accordion List */}
            <Accordion />
            <div className="space-y-10">
                {/* FAQ Heading */}
                <div className="mb-8">
                    <h3 className="text-4xl font-bold text-white">
                        Frequently asked <br /> questions
                    </h3>
                    <p className="text-gray-400 text-sm mt-3">
                        Discover the next GEM having x20+ ROI potential with our ultimate database and in-depth scoring system.
                    </p>
                </div>

                {/* Support/Contact Box */}
                <div className="flex justify-center flex-col gap-2 bg-brand-glass p-6 rounded-xl text-center">
                    <img src="/svg/support.svg" alt="" className='h-[200px]' />
                    <p className="text-white text-lg font-semibold mb-2">
                        Still no luck? We can help!
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                        Contact us and we'll get back to you as soon as possible.
                    </p>
                    <Link href="/contact">
                        <button className="py-3 px-8 font-bold text-black bg-brand-yellow rounded-lg hover:bg-yellow-400 transition-colors">
                            SUBMIT A REQUEST
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};