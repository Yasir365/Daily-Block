import { EyeOff, MoveUpRight } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ResetForm = () => {
    const router = useRouter();

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Password reset successfully!");
        router.push("/auth/login");
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-brand-muted">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
                <button type="button" className="absolute right-3 top-11 text-brand-muted">
                    <EyeOff size={20} />
                </button>
            </div>

            <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-brand-muted">Confirm Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
                <button type="button" className="absolute right-3 top-11 text-brand-muted">
                    <EyeOff size={20} />
                </button>
            </div>
            <p className="text-brand-muted text-sm">Use 8 or more characters with a mix of letters, numbers & symbols</p>

            <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                Continue Password Now
                <MoveUpRight className="w-4 h-4" />
            </button>

            <p className="text-brand-muted text-center text-sm">
                Wrong Mail
                <Link href="/forgot-password" className="text-white ml-1">Send to different email</Link>
            </p>
        </form>
    )
}