"use client";

import { Collapse } from "antd";
import type { CollapseProps } from "antd";

const faqData = [
    {
        title: "How do projects qualify for a Top ICO/IDO/IEO List?",
        content: (
            <>
                <p className="mb-3">
                    At Daily Block, projects must meet a strict set of standards before being featured on our Top ICO/IDO/IEO List.
                    Our research team carefully reviews each project based on several key factors:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-300">
                    <li>The <strong>strength and credibility</strong> of the team and their track record in the blockchain industry.</li>
                    <li>The <strong>growth potential</strong> of the project and the real-world application of the technology.</li>
                    <li>The effectiveness of the project's <strong>marketing efforts</strong> and the strength of its <strong>community engagement</strong>.</li>
                    <li>The <strong>tokenomics, distribution model</strong>, and <strong>utility</strong> of the token within the ecosystem.</li>
                    <li>Supporting materials such as the <strong>whitepaper, technical documentation</strong>, and <strong>partnerships or collaborations</strong>.</li>
                </ul>
                <p className="mt-3">
                    Only projects that demonstrate transparency, innovation, and long-term potential are selected. Our list is continuously updated
                    and reviewed to ensure that Daily Block delivers the most reliable and up-to-date insights for our users.
                </p>
            </>
        ),
    },
    {
        title: "The Difference Between ICO and IDO Listings",
        content: "Details on the difference...",
    },
    {
        title: "How Does Daily Block Rate Upcoming Crypto Projects?",
        content: "Details on the rating process...",
    },
    {
        title: "Where Can You Find the Latest News About Upcoming Crypto Coins?",
        content: "Details on news sources...",
    },
    {
        title: "How to Find New Crypto Projects Early?",
        content: "Details on early discovery...",
    },
];

export const Accordion = () => {
    const items: CollapseProps["items"] = faqData.map((item, index) => ({
        key: String(index),
        label: <span className="text-white font-medium text-base">{item.title}</span>,
        children: (
            <div className="text-gray-300 text-sm leading-relaxed px-6 pb-4">
                {item.content}
            </div>
        ),
    }));

    return (
        <div className="w-full">
            <Collapse
                accordion
                defaultActiveKey={["0"]}
                ghost
                items={items}
                className="bg-transparent"
                expandIconPosition="end"
                style={{
                    background: 'transparent',
                }}
            />
            <style jsx global>{`
                .ant-collapse-ghost > .ant-collapse-item {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    margin-bottom: 12px;
                }
                
                .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-header {
                    padding: 16px 20px;
                    color: white;
                }
                
                .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
                    padding: 0;
                }
                
                .ant-collapse-expand-icon {
                    color: white !important;
                    font-size: 14px;
                }
                
                .ant-collapse-ghost .ant-collapse-item:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};