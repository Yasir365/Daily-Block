import WatchListMain from "@/components/watchlist/WatchListMain";
import WatchSection from "@/components/watchlist/WatchSection";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col container px-4 mx-auto mt-6 gap-8 ">
            <WatchListMain />
            <WatchSection />
        </div>
    );
}