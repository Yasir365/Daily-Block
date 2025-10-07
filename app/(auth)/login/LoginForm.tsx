import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { EyeOff } from "lucide-react"
import Link from "next/link"

export const LoginForm = () => {
    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
            </div>

            <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-brand-muted">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="........."
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
                <button type="button" className="absolute right-3 top-11 text-brand-muted">
                    <EyeOff size={20} />
                </button>
            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="keep-logged-in" className="h-4 w-4 rounded bg-brand-glass border-gray-600 text-brand-yellow focus:ring-brand-yellow" />
                    <label htmlFor="keep-logged-in" className="text-brand-muted">Keep me logged in</label>
                </div>
                <Link href="forgot-password" className="font-medium underline">Forgot your password?</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                <button type="submit" className="w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                    Sign In
                </button>

                <p className="w-full text-center text-sm text-brand-muted flex items-center justify-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-medium text-brand-yellow hover:underline ml-1">
                        Sign up
                    </Link>
                </p>
            </div>


            <div className="flex items-center gap-4">
                <hr className="w-full border-gray-600" />
                <span className="text-brand-muted">OR</span>
                <hr className="w-full border-gray-600" />
            </div>

            <SocialLoginButtons />


        </form>
    )
}