import React from "react";

const Header = () => {
    return (
        <div className="flex items-center justify-between bg-brand-glass rounded-lg px-4 py-3 shadow-md">
            <input
                type="text"
                placeholder="How do you feel today?"
                className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder-brand-muted"
            />
            <button className="bg-brand-yellow text-black px-4 py-1 rounded-xl ml-3">
                Post
            </button>
        </div>
    );
};

export default Header;
