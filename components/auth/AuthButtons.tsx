
export const AuthButtons = () => {
    return (
        <div className="flex rounded-xl bg-brand-gray/50 p-1">

            <button className="w-1/2 py-3 rounded-lg text-brand-dark bg-brand-yellow font-semibold transition-colors ">
                Log In
            </button>

            <button className="w-1/2 py-3 rounded-lg text-brand-text-muted bg-transparent font-semibold transition-colors ">
                Sign Up
            </button>
        </div>
    )
}