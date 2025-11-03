"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

// Fetch blog function
const fetchBlog = async (id: string) => {
    const res = await fetch(`/api/blogs/${id}`);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch blog");
    }

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch blog");

    return data.data;
};
const addComment = async ({
    blogId,
    userId,
    comment,
}: {
    blogId: string;
    userId: string;
    comment: string;
}) => {
    const res = await fetch(`/api/blogs/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, comment }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to add comment");
    return data.data;
};
type Comment = {
    _id: string;
    userId: string;
    comment: string;
    createdAt: string;
};

type Blog = {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    readTime: number;
    image?: string;
    status: string;
    publishedDate?: string | null;
    views: number;
    likes: number;
    comments: Comment[];
};

const BlogDetail = () => {
    const params = useParams();
    const blogId = params.id as string;
    const queryClient = useQueryClient();

    const { data: blog, isLoading, isError, error } = useQuery<Blog, Error>({
        queryKey: ["blog", blogId],
        queryFn: () => fetchBlog(blogId),
        enabled: !!blogId,
    });


    const [comment, setComment] = useState("");
    const userId = "670eacb93c17bb001e3213b1"; // ✅ Replace with logged-in user id

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            setComment("");
            // ✅ Refetch blog comments
            queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
        },
    });
    if (isLoading) {
        return (
            <main className="container mx-auto py-12 text-center">
                <p className="text-lg text-gray-500">Loading blog…</p>
            </main>
        );
    }

    if (isError || !blog) {
        return (
            <main className="container mx-auto py-12 text-center">
                <p className="text-lg text-red-500">
                    {error?.message || "Blog not found"}
                </p>
            </main>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 md:px-0">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 capitalize">{blog.title}</h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center text-gray-500 text-sm mb-6 space-x-4">
                <span>Read time: {blog.readTime} min</span>
                <span>Status: {blog.status}</span>
                {blog.publishedDate && (
                    <span>
                        Published: {new Date(blog.publishedDate).toLocaleDateString()}
                    </span>
                )}
                <span>Views: {blog.views}</span>
                <span>Likes: {blog.likes}</span>
            </div>

            {/* Image */}
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full max-h-[500px] object-cover mb-6 rounded-lg"
                />
            )}

            {/* Excerpt */}
            <p className="text-gray-700 mb-6 italic">{blog.excerpt}</p>

            {/* Content */}
            <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />


            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Comments ({blog.comments.length})
                </h2>

                {blog.comments.length === 0 && (
                    <p className="text-gray-500 mb-4">No comments yet.</p>
                )}

                <ul className="space-y-4 mb-6">
                    {blog.comments.map((c) => (
                        <li key={c._id} className="border rounded-lg p-4">
                            <p className="text-gray-800">{c.comment}</p>
                            <span className="text-gray-500 text-sm">
                                {new Date(c.createdAt).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Add Comment Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!comment.trim()) return;
                        mutation.mutate({ blogId, userId, comment });
                    }}
                    className="flex flex-col gap-3"
                >
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        className="w-full p-3 border rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {mutation.isPending ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default BlogDetail;
