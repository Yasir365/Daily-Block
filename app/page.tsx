import { FAQSection } from '@/components/site/FAQSection';
import { FeatureSection } from '@/components/site/FeatureSection';
import { HeroSection } from '@/components/site/hero/HeroSection';
import { Newsletter } from '@/components/site/news-letter/NewsLetter';
import { ProjectCardsSection } from '@/components/site/ProjectCard/ProjectCardsSection';
import { ProjectsFilterTable } from '@/components/site/ProjectCard/ProjectsFilterTable';

export default function Page() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Top Cards Section */}
            <ProjectCardsSection />

            {/* Filterable Table Section */}
            <ProjectsFilterTable />

            {/* Left Feature Block */}
            <FeatureSection />

            {/* Right FAQ and Support Block */}
            <FAQSection />

            {/* Newsletter Section */}
            <Newsletter />
        </>
    );
}