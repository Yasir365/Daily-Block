import ArticleCard from "@/components/blogs/ArticleCard";
import BlogsNav from "@/components/blogs/HeroArticle";

export default function Page() {
    return (
        <main className="container mx-auto">
            <BlogsNav />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <ArticleCard
                    title="GOOD Airdrop Two: the next big crypto airdrop"
                    description="Join GOOD Airdrop Two - the crypto airdrop with 2M $GOOD up for grabs. Trade on goodcryptotx, hold 10K+ GOOD." />

                <ArticleCard
                    title="AMA session recap"
                    description="$GOOD launch is set for September 9th. The post explains token's main features, token distribution and release schedule, launch details, and more." />

                <ArticleCard
                    title="200% ROI Bitcoin DCA: a comprehensive case study"
                    description="$GOOD launch is set for September 9th. The post explains token's main features, token distribution and release schedule." />

                <ArticleCard
                    title="AMA session recap"
                    description="$GOOD launch is set for September 9th. The post explains token's main features, token distribution and release schedule, launch details, and more." />

            </section>
        </main>

    );
}