import React from "react";
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";

interface Props {
    username: string;
    time: string;
    title: string;
    description: string;
    image: string;
}

const Post: React.FC<Props> = ({ username, time, title, description, image }) => {
    return (
        <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
                <img
                    src="svg/community/coin.svg"
                    alt={username}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h4 className="font-semibold text-sm">{username}</h4>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>

            <p className="text-sm mb-2">
                <span className="text-yellow-400 font-semibold">#Bitcoin</span> {title}
            </p>
            <p className="text-gray-300 text-sm">{description}</p>

            <div className="mt-3">
                <img src={image} alt="post" className="w-full rounded-xl" />
            </div>

            {/* Reaction Buttons */}
            <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
                <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:text-red-400">
                        <Heart size={18} /> 35
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-400">
                        <MessageCircle size={18} /> 21
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-400">
                        <Repeat2 size={18} /> 6
                    </button>
                    <button className="flex items-center gap-1 hover:text-yellow-400">
                        <Share2 size={18} /> 38
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
