import CoinViewLeft from "@/components/coin-view/CoinViewLeft";
import CoinViewContent from "@/components/coin-view/CoinViewMiddle";
import CoinViewRight from "@/components/coin-view/CoinViewRight";
import { Newsletter } from "@/components/news-letter/NewsLetter";

export default function Page() {
    return (
        <div>
            <div className="min-h-screen container grid grid-cols-1 md:grid-cols-7 p-12 mx-auto gap-4">
                <CoinViewLeft />
                <CoinViewContent />
                <CoinViewRight />
            </div>
            <Newsletter />
        </div>

    );
}