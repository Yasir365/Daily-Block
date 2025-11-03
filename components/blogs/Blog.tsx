"use client"
import React from 'react'
import BlogsNav from './HeroArticle'
import ArticleCard from './ArticleCard'
import { useFetchBlogs } from '@/hooks/useblog'


const Blog = () => {
    const { data = [], isLoading, refetch } = useFetchBlogs();
    const blogs: any[] = data?.data ?? [];          // <-- the blog list
    const stats = data?.stats;                     // optional stats
    console.log({ blogs, stats })
    // Split the first blog (hero) from the rest
    const heroBlog = blogs[0];                     // may be undefined
    const restBlogs = blogs.slice(1);              // everything after #0
    // -----------------------------------------------------------------
    // Loading / empty UI
    // -----------------------------------------------------------------
    if (isLoading) {
        return (
            <main className="container mx-auto py-12 text-center">
                <p className="text-lg text-gray-500">Loading blogs…</p>
            </main>
        );
    }

    if (!heroBlog && restBlogs.length === 0) {
        return (
            <main className="container mx-auto py-12 text-center">
                <p className="text-lg text-gray-600">No blogs found.</p>
                {/* <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-brand-yellow text-black rounded-full"
                >
                    Retry
                </button> */}
            </main>
        );
    }
    console.log({ heroBlog })
    return (
        <main className="container mx-auto">
            {heroBlog && <BlogsNav blog={heroBlog} stats={stats} />}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {restBlogs.length > 0 ? (
                    restBlogs.map((blog) => (
                        <ArticleCard
                            key={blog._id}
                            title={blog.title}
                            description={blog.excerpt}
                        // you can pass any other props your ArticleCard expects
                        // e.g. image={blog.image}, readTime={blog.readTime}, etc.
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No additional articles at the moment.
                    </p>
                )}
            </section>

        </main>
    )
}

export default Blog