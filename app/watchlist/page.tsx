import Main from "@/components/watchlist/Main";
import Section from "@/components/watchlist/Section";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col max-w-[1800px] px-4 mx-auto mt-6 gap-8 ">
            <Main />
            <Section />
        </div>
    );
}