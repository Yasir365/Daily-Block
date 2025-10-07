export const AuthImage = ({ img }: { img: string }) => {
    return (
        <div className="mt-8 relative w-full max-w-md">
            <img src={img} alt="Crypto Illustration" className="w-full h-auto" />
        </div>
    );
};
