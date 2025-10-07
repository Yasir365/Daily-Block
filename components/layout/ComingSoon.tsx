export const ComingSoon = ({ title }: { title: string }) => {
    return (
        <div className="text-center min-h-screen flex justify-center items-center flex-col gap-4">
            <h1 className="text-4xl">{title}</h1>
            <h3 className="text-2xl">Coming Soon...</h3>
        </div>
    )
}
