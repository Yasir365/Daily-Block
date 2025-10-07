import Link from "next/link";

export const AuthButtons = ({ active }: { active: string }) => {
    return (
        <div className="flex rounded-xl bg-brand-gray p-1 w-full">
            <Link href="/login" className={`w-1/2 py-3 rounded-lg text-center font-semibold transition-colors ${active === "login" ? "bg-brand-yellow text-black" : "bg-transparent text-brand-muted"}`} >
                Log In
            </Link>

            <Link href="/signup" className={`w-1/2 py-3 rounded-lg text-center font-semibold transition-colors ${active === "signup" ? "bg-brand-yellow text-black" : "bg-transparent text-brand-muted"}`} >
                Sign Up
            </Link>
        </div>
    );
};
