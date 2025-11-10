"use client";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

type Action = "like" | "repost" | "share";

interface UsePostInteractionReturn {
  handleAction: (action: Action) => { error?: string };
  confirmShare: () => void;
  mutation: UseMutationResult<
    { data: any; action: Action }, // data returned by mutationFn
    Error, // error type
    Action, // variables type
    { previousPosts: unknown } // context type
  >;
  userId?: string;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (val: boolean) => void;
}

export const usePostInteraction = (
  postId: string,
  selectedCoinId: string,
  username: string,
  queryKey: any[] // Pass explicitly from component
): UsePostInteractionReturn => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthContext();
  const userId = user?._id;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Helper to update post data
  const updatePost = (post: any, action: Action) => {
    const likes = Array.isArray(post.likes) ? post.likes : [];
    const reposts = Array.isArray(post.reposts) ? post.reposts : [];
    const shares = Array.isArray(post.shares) ? post.shares : [];

    switch (action) {
      case "like":
        return {
          ...post,
          likes: likes.includes(userId)
            ? likes.filter((uid: string) => uid !== userId)
            : [...likes, userId],
        };
      case "repost":
        return {
          ...post,
          reposts: reposts.some((r: any) => r.userId === userId)
            ? reposts
            : [...reposts, { userId }],
        };
      case "share":
        return {
          ...post,
          shares: shares.includes(userId)
            ? shares.filter((uid: string) => uid !== userId)
            : [...shares, userId],
        };
      default:
        return post;
    }
  };

  const mutation = useMutation({
    mutationFn: async (action: Action) => {
      const res = await fetch(`/api/community/${postId}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Interaction failed");
      return { data, action };
    },

    onMutate: async (action: Action) => {
      await queryClient.cancelQueries({ queryKey });
      const previousPosts = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;

        // If cached data is an array (list of posts)
        if (Array.isArray(old)) {
          return old.map((p) => (p._id === postId ? updatePost(p, action) : p));
        }

        // If cached data is a single post object
        if (old._id === postId) {
          return updatePost(old, action);
        }

        return old;
      });

      return { previousPosts };
    },

    onError: (_err, _action, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleAction = (action: Action): { error?: string } => {
    if (!isAuthenticated || !userId) {
      return { error: "You must be logged in to interact with posts." };
    }

    if (action === "share") {
      setIsShareModalOpen(true);
      return {};
    }

    mutation.mutate(action);
    return {};
  };

  const confirmShare = () => {
    mutation.mutate("share");
    setIsShareModalOpen(false);
  };

  return {
    handleAction,
    confirmShare,
    mutation,
    userId,
    isShareModalOpen,
    setIsShareModalOpen,
  };
};
