import { FAQSection } from '@/components/FAQSection';
import { FeatureSection } from '@/components/FeatureSection';
import { HeroSection } from '@/components/hero/HeroSection';
import { Newsletter } from '@/components/news-letter/NewsLetter';
import { ProjectCardsSection } from '@/components/ProjectCard/ProjectCardsSection';
import { ProjectsFilterTable } from '@/components/ProjectCard/ProjectsFilterTable';

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