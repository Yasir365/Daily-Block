export const SocialLoginButtons = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button type="button" className="w-full py-3 flex items-center justify-center gap-1 bg-brand-glass border border-gray-600 rounded-full hover:bg-gray-700">
                <img src="/svg/icons/google.svg" alt="Login with Google" className="w-[26px] h-[26px]" />
                <span className="text-[15px]"> Continue with Google </span>
            </button>
            <button type="button" className="w-full py-3 flex items-center justify-center gap-1 bg-brand-glass border border-gray-600 rounded-full hover:bg-gray-700">
                <img src="/svg/icons/fb.svg" alt="Login with Facebook" className="w-[26px] h-[26px]" />
                <span className="text-[15px]"> Continue with Facebook </span>
            </button>
            <button type="button" className="w-full py-3 flex items-center justify-center gap-1 bg-brand-glass border border-gray-600 rounded-full hover:bg-gray-700">
                <img src="/svg/icons/apple.svg" alt="Login with Apple" className="w-[26px] h-[26px]" />
                <span className="text-[15px]"> Continue with Apple </span>
            </button>
        </div>
    );
};
