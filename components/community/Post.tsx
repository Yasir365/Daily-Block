import React from "react";
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import Image from "next/image";


const PostOptions = [
    { id: 1, icon: <Heart size={18} />, count: 35 },
    { id: 2, icon: <MessageCircle size={18} />, count: 35 },
    { id: 3, icon: <Repeat2 size={18} />, count: 35 },
    { id: 4, icon: <Share2 size={18} />, count: 35 },
]
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
                <div className="flex items-center gap-1">
                    <h4 className="font-semibold text-sm">{username}</h4>
                    <span className="flex gap-1 items-center">
                        <Image src="/svg/verified.svg" alt="coin" width={16} height={16} />
                        <span className="text-xs text-gray-500">{time}</span>
                    </span>
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
                    {PostOptions.map((option) => (
                        <button key={option.id} className={`flex items-center gap-1  rounded-full px-3 py-1 border border-[rgb(36, 46, 64)] hover:text-${option.id === 1 ? "red-400" : option.id === 2 ? "blue-400" : option.id === 3 ? "green-400" : "yellow-400"}`}>
                            {option.icon} {option.count}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;

