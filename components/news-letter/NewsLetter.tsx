import { NewsletterForm } from "./NewsletterForm";

export const Newsletter = () => {
    return (
        // Main container matching the design's dark box with rounded corners
        <div className="bg-[#2D2D2D] mt-8 p-8 md:p-12 rounded-2xl max-w-5xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row gap-10">

                {/* Left Side: Text Content */}
                <div className="md:w-1/2 text-white space-y-4">
                    <p className="text-brand-yellow font-medium text-sm">Newflatters</p>
                    <h2 className="text-3xl font-bold leading-tight">Stories and interviews</h2>

                    <p className="text-gray-400 max-w-md">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>
                </div>

                {/* Right Side: Submission Form */}
                <NewsletterForm />
            </div>
        </div>
    );
};