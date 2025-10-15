import LeftSide from "@/components/coin/left-side";
import { Share2, Star, TrendingDown } from "lucide-react";
import Image from "next/image";

export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-7 p-12 mx-auto gap-4">
            <LeftSide />
            <div className="flex flex-col col-span-3">
                <div className="flex flex-col bg-brand-glass p-2 rounded-xl"></div>
            </div>
            <div className="flex flex-col col-span-2">
                <div className="flex flex-col bg-brand-glass p-2 rounded-xl"></div>
            </div>
        </div>

    );
}