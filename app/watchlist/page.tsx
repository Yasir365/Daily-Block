import { ProjectsFilterTable } from "@/components/ProjectCard/ProjectsFilterTable";
import WatchListMain from "@/components/watchlist/WatchListMain";
import WatchSection from "@/components/watchlist/WatchSection";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col container px-4 mx-auto mt-6">
            <h1
                className="ml-3 font-titilliumWeb font-bold text-[30px] leading-[67.1px] tracking-[0px]"
            >
                Watchlist
            </h1>
            <ProjectsFilterTable />
        </div>
    );
}