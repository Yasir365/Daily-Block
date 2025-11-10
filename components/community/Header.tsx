"use client";
import React, { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/AuthContext";
import { IcoProject } from "@/hooks/useIcoProjects";

const Header = ({ coins, userSelectedCoin = "" }: { coins: IcoProject[], userSelectedCoin?: string }) => {
    const [selectedCoin, setSelectedCoin] = useState("");
    const [postText, setPostText] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const queryClient = useQueryClient();
    const { user, isAuthenticated, loading } = useAuthContext();

    React.useEffect(() => {
        if (userSelectedCoin) {
            setSelectedCoin(userSelectedCoin);
        }
    }, [userSelectedCoin]);

    // ✅ Handle multiple image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImages((prev) => [...prev, ...files]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // ✅ TanStack mutation with FormData
    const { mutate: createPost, isPending } = useMutation({
        mutationFn: async (newPost: any) => {
            const formData = new FormData();
            formData.append("coin", newPost.coin);
            formData.append("userId", user?._id || "guest");
            formData.append("username", user?.name || "Anonymous");
            formData.append("content", newPost.content);
            newPost.images.forEach((img: File) => {
                formData.append("images", img);
            });

            const response = await fetch(`/api/community/${newPost.coin}/posts`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to create post");
            return await response.json();
        },
        onSuccess: () => {
            setPostText("");
            setImages([]);
            queryClient.invalidateQueries({
                queryKey: ["posts"],
                exact: false,
            });
        },
        onError: (err) => {
            console.error(err);
            alert("Error creating post!");
        },
    });

    const handlePost = () => {
        if (!selectedCoin || !postText.trim()) {
            alert("Please select a coin and write something!");
            return;
        }

        createPost({
            coin: selectedCoin,
            userId: "guest",
            username: "Anonymous",
            content: postText,
            images,
        });
    };

    return (
        <div className="bg-brand-glass rounded-lg px-4 py-3 shadow-md">
            {/* Row: Select + Input + Button */}
            <div className="flex flex-col  gap-2 space-x-3">
                <div className="flex items-center flex-1 space-x-3">

                    <div className="flex flex-col gap-2 w-full">
                        <textarea
                            placeholder="How do you feel today?"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            rows={1}
                            onFocus={(e) => e.target.rows = 4}
                            onBlur={(e) => {
                                if (!e.target.value.trim()) e.target.rows = 1;
                            }}
                            className="flex-1 w-full resize-none bg-transparent outline-none text-sm text-gray-300 placeholder-brand-muted   rounded-md px-3 py-2 transition-all duration-300 "
                        />
                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="Preview"
                                            className="rounded-lg border border-gray-700 w-full h-24 object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-black/70 rounded-full p-1 hover:bg-black/90"
                                        >
                                            <X size={14} className="text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-end justify-end">

                    <span className="flex items-center gap-3">
                        {/* Select Coin */}
                        <select
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                            className="bg-[#1e1e1e]/60 border border-gray-700 text-gray-300 text-sm rounded-md px-3 py-2 outline-none focus:border-brand-yellow transition"
                        >
                            <option value="">Select Coin</option>
                            {coins.map((coin: IcoProject) => (
                                <option key={coin._id} value={coin._id} className="text-black">
                                    {coin.coinAbbreviation}
                                </option>
                            ))}
                        </select>

                        {/* Image Upload */}
                        <label className="flex items-center justify-center h-9 w-9 rounded-md bg-[#1e1e1e]/60 border border-gray-700 text-gray-300 cursor-pointer hover:text-brand-yellow hover:border-brand-yellow transition">
                            <ImageIcon size={20} />
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {/* Post Button */}
                        <button
                            onClick={handlePost}
                            disabled={isPending}
                            className="bg-brand-yellow text-black font-medium px-5 py-2 rounded-md hover:bg-yellow-400 transition disabled:opacity-50"
                        >
                            {isPending ? "Posting..." : "Post"}
                        </button>
                    </span>

                </div>
            </div>




        </div>
    );
};

export default Header;
