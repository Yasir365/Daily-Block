import React from "react";

interface Props {
    name: string;
    setSelectedCoin: (({ _id, coinName }: { _id: string; coinName: string }) => void);
    _id: string;
    selectedCoin: { _id: string; coinName: string }; // 👈 new prop

}
const CoinCard: React.FC<Props> = ({ name, setSelectedCoin, _id, selectedCoin }) => {
    const isSelected = selectedCoin._id === _id; // 👈 check if this coin is selected
    console.log({ selectedCoin, _id })
    const handleClick = () => {
        // setSelectedCoin(isSelected ? "" : _id); // 👈 toggle logic
        setSelectedCoin({ _id, coinName: name });
    };
    return (
        <div className={`flex items-center gap-3 p-3 cursor-pointer transition border-b border-brand-glass font-lato rounded-lg
                ${isSelected ? "bg-brand-yellow text-black font-semibold" : "hover:bg-gray-700"}
            `} onClick={handleClick}>
            <img
                src="/svg/community/coin.svg"
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[16px] font-medium">{name}</span>
        </div>
    );
};

export default CoinCard;
