
export default function BlogsNav() {
    return (
        <>
            <nav className="py-4 backdrop-blur-md bg-opacity-20 sticky top-0 z-10">
                <div className="flex space-x-6">
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold border-b border-transparent hover:border-green-400 transition-colors pb-1">All</a>
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold">Manuals</a>
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold">Degree</a>
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold">Trading Strategies</a>
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold">Education</a>
                    <a href="#" className="text-white hover:text-green-400 text-sm font-semibold">Reviews</a>
                </div>
            </nav>
        </>
    );
}
