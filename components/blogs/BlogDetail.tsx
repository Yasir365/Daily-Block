"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CustomToast } from "../ui/ReactToast";
import { formatDateTime } from "@/lib/helpers";
const saveButton = "self-end inline-flex px-6 py-3 text-black bg-brand-yellow rounded-xl w-fit font-inter font-semibold text-[16px] leading-[24px]";


// Fetch blog function
const fetchBlog = async (id: string, userId: string, userRole: string) => {
    const res = await fetch(`/api/blogs/${id}`, {
        headers: {
            "x-user-id": userId || "guest",
            "x-user-role": userRole || "guest",
        },
    });

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
    likes: string[];
    comments: Comment[];
    userId: string;
};

const BlogDetail = () => {
    const params = useParams();
    const blogId = params.id as string;
    const queryClient = useQueryClient();
    const { user, isAuthenticated, loading } = useAuthContext();

    const userId = user?._id || ""; // ✅ dynamic user ID
    const userRole = user?.type || "user"; // ✅ dynamic user role 
    const { data: blog, isLoading, isError, error } = useQuery<Blog, Error>({
        queryKey: ["blog", blogId],
        queryFn: () => fetchBlog(blogId, userId, userRole),
        enabled: !!blogId && !loading,
    });


    const [comment, setComment] = useState("");

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            setComment("");
            // ✅ Refetch blog comments
            queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
        },
    });
    const likeMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/blogs/${blogId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, userRole }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Failed to toggle like");
            return data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
        },
        onError: (error) => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message={error.message || "Failed to toggle like"}
                />
            ))
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
    const isAuthor = blog.userId === userId;
    const isAdmin = userRole === "admin";
    const canInteract = !isAuthor && !isAdmin;

    return (
        <main className="container mx-auto py-8 px-4 md:px-0">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 capitalize">{blog.title}</h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center text-gray-500 text-sm mb-6 space-x-4">
                {/* <span>Read time: {blog.readTime} min</span>
                <span>Status: {blog.status}</span> */}
                {blog.publishedDate && (
                    <span>
                        Published: {new Date(blog.publishedDate).toLocaleDateString()}
                    </span>
                )}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        disabled={!canInteract || likeMutation.isPending}
                        onClick={() => likeMutation.mutate()}
                        className={`px-4 py-2 rounded-xl border border-brand-yellow/30 
                            ${canInteract ? "hover:bg-brand-yellow/20" : "opacity-50 cursor-not-allowed"}
                            `}
                    >
                        ❤️ {blog.likes.length} {blog.likes.length > 0 ? "Like" : "Likes"}
                    </button>
                </div>
                {/* <span>Views: {blog.views}</span>
                <span>Likes: {blog.likes}</span> */}
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
            <p className="text-gray-200 mb-6 italic  first-letter:uppercase">{blog.excerpt}</p>

            {/* Content */}
            <div
                className="prose max-w-none mb-8  first-letter:uppercase"
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
                        <li key={c._id} className="border rounded-lg p-4  border-brand-yellow/20">
                            <p className="text-gray-300  first-letter:uppercase">{c.comment}</p>
                            <span className="text-gray-500 text-sm ">
                                {formatDateTime(c.createdAt)}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Add Comment Form */}
                {canInteract && isAuthenticated ? (<form
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
                        className="w-full p-3 border rounded-md border-brand-yellow/20 active:border-brand-yellow/20"
                    />
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={saveButton}
                    >
                        {mutation.isPending ? "Posting..." : "Post Comment"}
                    </button>
                </form>) : (!isAuthenticated) ? (

                    <p className="text-gray-500 italic">You must be logged in to comment or like.</p>
                ) : (
                    <p className="text-gray-500 italic">You cannot comment or like your own blog.</p>
                )}
            </div>
        </main>
    );
};

export default BlogDetail;
