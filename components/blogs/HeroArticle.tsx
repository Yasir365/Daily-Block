import { formatDateTime } from "@/lib/helpers";

export default function BlogsNav({ blog, stats, onClick }: { blog?: any; stats?: any, onClick: (_id: string) => void }) {
    const { image, title, createdAt, excerpt } = blog
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-20 p-8 rounded-lg cursor-pointer" onClick={() => onClick(blog._id)}>

                <div className="h-96 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-6xl text-gray-500">
                        <img src={image} alt="" />
                    </div>
                </div>

                <div className="flex flex-col pt-6">
                    <h1 className="text-2xl lg:text-3xl  font-bold leading-tight font-titilliumWeb tracking-wide text-white capitalize">
                        {title}
                    </h1>
                    <p className="text-lg text-white mt-2 font-inter">{formatDateTime(createdAt)}</p>
                    <p className="mt-4 text-lg text-[#9CA3AF] leading-relaxed first-letter:uppercase ">
                        {excerpt}
                    </p>
                </div>
            </section>
        </>
    );
}
