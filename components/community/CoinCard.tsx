import React from "react";

interface Props {
    name: string;
}

const CoinCard: React.FC<Props> = ({ name }) => {
    return (
        <div className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition border-b border-brand-glass">
            <img
                src="/svg/community/coin.svg"
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
};

export default CoinCard;
