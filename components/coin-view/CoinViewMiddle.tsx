import Image from "next/image";
import { Accordion } from "../Accordion";
import { CoinData } from "./CoinView";
import parse from "html-react-parser"; // ✅ parse HTML strings safely

const CoinViewContent = ({ coin }: { coin: CoinData }) => {
    const icoImages = coin?.icoImages || []; // ✅ Ensure it's always an array
    return (
        <div className="flex flex-col col-span-3">
            <div className="flex flex-col p-2 gap-2 rounded-xl">
                {icoImages.length > 0 && (
                    <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
                        <Image
                            src={icoImages[0]}
                            alt="coin main"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* Small thumbnails */}
                {icoImages.length > 1 && (
                    <div className="flex items-center gap-2 mt-2">
                        {icoImages.slice(1).map((img, i) => (
                            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`coin thumbnail ${i}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {/* <img src="/svg/coinview.svg" alt="coin" />
                <h2 className="text-white text-xl font-600">Detect New Crypto Coins With Hot IDO, IEO & ICO List</h2>
                <ul className="text-brand-muted">
                    <li>KeetaAI is the first AI-native product suite built on Keeta Network—the fastest L1, backed by Google’s Eric Schmidt.</li>
                    <li>Offers a set of AI-powered on-chain products for wallet tracking, agent analytics, and on-chain intelligence.</li>
                    <li>Positioned as the go-to AI infrastructure layer for the Keeta ecosystem and beyond.</li>
                </ul>
                {[1, 2].map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-2 w-full">
                            <h4 className="text-yellow-400 font-semibold">Problem</h4>
                            <div className="flex-1 border-t border-dotted border-yellow-400"></div>
                        </div>

                        <p className="text-brand-muted">Keeta AI’s infrastructure spans several tightly integrated products:</p>
                        <p className="text-brand-muted">Data Ingestion Layer: Pulls wallet and token-level activity from Keeta, Ethereum, Solana, and other supported chains.</p>
                        <p className="text-brand-muted">Behavioral Modeling Engine: Evaluates timing, consistency, volatility, and pattern recognition across wallets.</p>
                        <p className="text-brand-muted">Signal and Alert System: Detects and communicates real-time behavior changes, trade setups, and wallet movement.</p>
                        <p className="text-brand-muted">Token Launcher: Enables no-code token deployment within the same interface.</p>
                        <p className="text-brand-muted">Users can interact with Keeta AI through the following workflows:</p>
                        <p className="text-brand-muted">- Analyze wallet activity in real time</p>
                        <p className="text-brand-muted">- Analyze wallet activity in real time</p>
                        <p className="text-brand-muted">- Analyze wallet activity in real time</p>
                        <p className="text-brand-muted">- Analyze wallet activity in real time</p>
                        <p className="text-brand-muted">- Analyze wallet activity in real time</p>
                    </div>
                ))
                } */}
                {/* Parsed HTML content */}
                <div className="prose prose-invert max-w-none text-gray-300 font-inter font-normal text-[15.27px] leading-relaxed px-6 pb-4 space-y-2">
                    {coin.additionalDetails ? parse(coin.additionalDetails) : null}
                </div>

                <div className="flex items-center gap-2 w-full">
                    <h4 className="text-yellow-400 font-semibold">Frequently asked questions</h4>
                    <div className="flex-1 border-t border-dotted border-yellow-400"></div>
                </div>

                <Accordion faqs={coin.faqs} />
            </div>
        </div >
    )
}

export default CoinViewContent;