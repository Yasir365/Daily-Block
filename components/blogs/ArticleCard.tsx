import React from 'react'

export default function ArticleCard({ title, description }: { title: string, description: string }) {
    return (
        <article className="flex items-start space-x-6 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">

            <div className="w-50 flex-shrink-0 overflow-hidden bg-purple-900/50">
                <div className="w-full h-full flex items-center justify-center text-xl text-purple-400">
                    <img src="/svg/blog/blog.svg" alt="blog illustration" />
                </div>
            </div>

            <div className="flex-grow pr-4">
                <h2 className="text-xl font-bold text-white leading-snug">
                    {title}
                </h2>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{description}</p>
                <p className="mt-3 text-xs font-medium text-gray-400">
                    September 25, 2025
                </p>
            </div>
        </article>
    )
}
