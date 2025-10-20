
export default function BlogsNav() {
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-20 p-8 rounded-lg">

                <div className="h-96 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-6xl text-gray-500">
                        <img src="/svg/blog/blog2.svg" alt="" />
                    </div>
                </div>

                <div className="flex flex-col pt-6">
                    <h1 className="text-2xl lg:text-3xl  font-bold leading-tight font-titilliumWeb tracking-wide text-white">
                        introducing GOOD token: tokenomics, utilities, launch details
                    </h1>
                    <p className="text-lg text-white mt-2 font-inter">August 8, 2025</p>
                    <p className="mt-4 text-lg text-[#9CA3AF] leading-relaxed  ">
                        Years of work on goodcryptotx haven't gone in vain. We've started with DEX trading and processed over $5B in trading volume to date. We then added DEX terminal and it's getting great traction with DEX DCA already surpassing its CEX sibling.
                    </p>
                </div>
            </section>
        </>
    );
}
