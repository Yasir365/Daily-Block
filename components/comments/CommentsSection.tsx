"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CustomToast } from "@/components/ui/ReactToast";
import { formatDateTime } from "@/lib/helpers";
import { useAuthContext } from "@/context/AuthContext";

export type Comment = {
    _id: string;
    userId: string;
    username?: string;
    content: string;
    createdAt: string;
};

interface CommentsSectionProps {
    parentId: string; // blogId or postId
    comments: Comment[];
    apiBase: string; // e.g. "/api/blogs" or "/api/posts"
    queryKey: [string, string]; // e.g. ["blog", blogId] or ["post", postId]
    allowInteraction?: boolean; // optional flag to allow or block commenting
    maxHeight?: string; // 🔹 Optional: limit height (e.g., "300px")

}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
    parentId,
    comments,
    apiBase,
    queryKey,
    allowInteraction = true,
    maxHeight
}) => {
    console.log({ maxHeight })
    const { user, isAuthenticated, loading } = useAuthContext();
    const queryClient = useQueryClient();

    const userId = user?._id || "";
    const username = user?.name || "Anonymous";

    const [comment, setComment] = useState("");

    // 🔹 Add Comment Mutation
    const mutation = useMutation({
        mutationFn: async ({
            parentId,
            userId,
            comment,
            username,
        }: {
            parentId: string;
            userId: string;
            comment: string;
            username: string;
        }) => {
            const res = await fetch(`${apiBase}/${parentId}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, comment, username }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Failed to add comment");
            return data.data;
        },
        onSuccess: () => {
            setComment("");
            queryClient.invalidateQueries({ queryKey: queryKey });
            toast.custom((t) => (
                <CustomToast t={t} status="success" message="Comment added successfully!" />
            ));
        },
        onError: (error: any) => {
            toast.custom((t) => (
                <CustomToast t={t} status="error" message={error.message || "Failed to comment"} />
            ));
        },
    });

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
                Comments ({comments?.length || 0})
            </h3>

            {/* Comments List */}
            <ul
                className="space-y-4 mb-6 overflow-y-auto custom-scrollbar"
                style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}
            >
                {comments.length > 0 ? (
                    comments.map((c, i) => (
                        <li
                            key={c._id || i}
                            className="border border-brand-yellow/20 rounded-lg p-3"
                        >
                            <p className="text-gray-200">{c.content}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                                <span>{c.username || "Unknown"}</span>
                                <span>{formatDateTime(c.createdAt)}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </ul>

            {/* Comment Form */}
            {allowInteraction && isAuthenticated ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!comment.trim()) return;
                        mutation.mutate({ parentId, userId, comment, username });
                    }}
                    className="flex flex-col gap-3"
                >
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        className="w-full p-3 border rounded-md border-brand-yellow/20 bg-transparent text-gray-200 focus:outline-none focus:border-brand-yellow/40"
                    />
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="self-end inline-flex px-6 py-3 text-black bg-brand-yellow rounded-xl w-fit font-semibold text-sm"
                    >
                        {mutation.isPending ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            ) : !isAuthenticated ? (
                <p className="text-gray-500 italic">You must be logged in to comment.</p>
            ) : (
                <p className="text-gray-500 italic">You cannot comment on this item.</p>
            )}
        </div>
    );
};
