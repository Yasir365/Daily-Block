// components/ui/CoinSearch.tsx

import { Search } from "lucide-react";

export const CoinSearch = () => {
    return (
        <div className="relative max-w-sm">
            <input
                type="text"
                placeholder="Search by Name / Token"
                className="w-full p-3 pl-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            {/* Search Icon */}
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    );
};