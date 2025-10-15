import React from 'react'
import SectionList from './SectionList'
import Image from 'next/image';
import { Newsletter } from '../news-letter/NewsLetter';

const listData = [
    "B2B2C Integrations: Partnering with non-custodial wallets, DeFi protocols, dApps, and fintech apps to tap directly into millions of users.",
    "Product-Led Virality: A frictionless UX (onboarding in under 60 seconds), strong referral incentives, and multi-chain support.",
    "Geographic Expansion: Rolling out in LatAm (PIX), SE Asia (local payment rails), and EU (SEPA).",
    "Infrastructure Built for Scale: Microservices, auto-liquidity management, and fast, compliant KYC ensure smooth growth."
];
const listData1 = [
    "Instant Settlements: On-chain in seconds, not days.",
    "Lower Fees: Fractions of a cent vs. $30–50 per SWIFT transfer.",
    "Non-Custodial Direct Transfers: Users hold their own keys—no risky escrow.",
    "DeFi Liquidity Pools: Deep, cross-chain liquidity ensures fair rates and constant availability."
];
const listData2 = [
    "True Ownership: Your keys, your crypto.",
    "Direct Spending: Tap-to-pay debit card linked to your wallet.",
    "24/7 Global Access: No banking hours or restrictions.",
    "Programmable Finance: Smart contracts allow custom rules and automated treasury management."
];
const LinkArray = [
    "Website ", "Twitter ", "Telegram ", " Telegram Announcements"

]
const Section = () => {
    return (
        <div className='flex flex-col gap-8 '>
            <p className='text-xl font-medium text-[#9CA3AF]'>
                We recently hosted an AMA with Alex from ByBarter to dive into their vision, growth strategy, and long-term roadmap. ByBarter is building a self-custodial bank and on/off-ramp solution designed to give users true financial sovereignty. If you missed the live conversation, here are the key highlights:
            </p>
            <SectionList list={listData} text='Alex explained how ByBarter plans to scale aggressively yet sustainably:' heading='Scaling from 15,000 → 2M Users in 12 Months' />
            <div className='flex flex-col-reverse md:flex-row justify-between gap-6 '>
                <div className='flex flex-col gap-8'>

                    <SectionList list={listData1} text='ByBarter is tackling inefficiencies in traditional systems like SWIFT and even competitors like Paxful:' heading='Faster, Cheaper Cross-Border Payments' />
                    <SectionList list={listData2} text='ByBarter challenges the old paradigm where banks control your money:' heading='Self-Custodial Banking' />
                    <SectionList list={listData} text='Alex explained how ByBarter plans to scale aggressively yet sustainably:' heading='Scaling from 15,000 → 2M Users in 12 Months' />
                </div>
                <div>
                    <Image src="/svg/watchlist/bitcoin.svg" alt="watchlist" width={586} height={527} />
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
                <div className='flex flex-col gap-8 order-2 md:order-1'>

                    <SectionList text='DailyBlock is a fully decentralized protocol for launching and growing innovative blockchain ideas. Our curation process and network access allow us to showcase only the most promising projects in Web3 and digital assets. With DailyBlock, decentralized teams can raise awareness, build strong communities, and receive long-term support. Users of the platform can engage in a secure, transparent, and compliant environment while leveraging assets across and beyond today’s standards.' heading='About DailyBlock' />
                    <span className='flex flex-wrap gap-1 items-center'>
                        {LinkArray.map((item, index) => (
                            <div key={index} className='flex gap-2'>
                                {index !== 0 && (<span className="inline-block w-[1px] h-6 bg-[#9CA3AF]  flex-shrink-0 "></span>)}
                                <span

                                    className={`text-xl font-medium text-[#9CA3AF] underline cursor-pointer`}
                                >
                                    {item}
                                </span>
                            </div>
                        ))}
                    </span>
                </div>
                <div className=' order-1 md:order-2'>
                    <Newsletter />
                </div>

            </div>
        </div>
    )
}

export default Section