"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import Image from "next/image";
import { Comment, CommentsSection } from "../comments/CommentsSection";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { usePostInteraction } from "@/hooks/usePostInteraction";
import ShareModal from "../modals/ShareModal";

interface repost {
    userId: string;
}
interface Props {
    username: string;
    time: string;
    title: string;
    description: string;
    image: string;
    active: boolean;
    id: string;
    comments: Comment[];
    selectedCoin: { _id: string; coinName: string };
    likes: string[];
    shares: string[];
    reposts: repost[];
    queryKey?: [string, string];
}

const Post: React.FC<Props> = ({
    username,
    time,
    title,
    description,
    image,
    active,
    id,
    comments,
    selectedCoin,
    likes,
    shares,
    reposts,
    queryKey = ["posts", selectedCoin._id],

}) => {
    const [showComments, setShowComments] = useState(false);

    // const userId = user?._id;

    const { handleAction,
        mutation,
        userId,
        isShareModalOpen,
        setIsShareModalOpen,
        confirmShare, } = usePostInteraction(id, selectedCoin._id, username, queryKey);


    return (
        <div className="p-4 border-b border-[rgb(36,46,64)]">
            {/* 🔹 Header */}
            <PostHeader username={username} active={active} time={time} />

            <PostContent title={title} description={description} image={image} />

            <PostActions
                likes={likes}
                shares={shares}
                reposts={reposts}
                commentsCount={comments.length}
                userId={userId}
                handleAction={handleAction}
                showComments={showComments}
                onCommentClick={() => setShowComments((prev) => !prev)}
                isPending={mutation.isPending}
            />

            {/* 🔹 Comments Section */}
            {showComments && (
                <CommentsSection
                    parentId={id}
                    comments={comments}
                    apiBase="/api/community"
                    queryKey={queryKey}
                    maxHeight="250"
                />
            )}
            {isShareModalOpen && (
                <ShareModal
                    postId={id}
                    onClose={() => setIsShareModalOpen(false)}
                    open={isShareModalOpen}
                    handleShare={confirmShare}
                />
            )}
        </div>
    );
};

export default Post;
