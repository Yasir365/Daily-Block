import React from 'react';

interface ArticleCardProps {
    title: string;
    description: string;
}

export default function ArticleCard({ title, description }: ArticleCardProps) {
    return (
        <article className="grid grid-cols-1 md:grid-cols-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer overflow-hidden" >
            {/* Left (Image Section) */}
            <div className="flex items-center justify-center">
                <img
                    src="/svg/blog/blog.svg"
                    alt="blog illustration"
                    className="max-w-full h-auto"
                />
            </div>

            {/* Right (Content Section) */}
            <div className="pl-6 flex flex-col">
                <h2 className="text-2xl font-bold text-white leading-snug font-titilliumWeb">
                    {title}
                </h2>
                <p className="mt-2 text-[19px] leading-snug   text-gray-300 line-clamp-2">{description}</p>
                <p className="mt-3 text-[19px] font-medium text-white font-inter">
                    September 25, 2025
                </p>
            </div>
        </article>
    );
}
