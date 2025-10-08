import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { ChevronDown, EyeOff, Mail } from "lucide-react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import toast from "react-hot-toast";

export const SignupForm = () => {
    const router = useRouter();

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Account created successfully!");
        router.push("/login");
    };
    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="text-sm font-medium text-brand-muted">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Email" // Placeholder is 'Email' in the image for all text fields, though 'First Name' would be more typical
                        className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="text-sm font-medium text-brand-muted">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Email" // Placeholder is 'Email' in the image
                        className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                </div>
            </div>

            {/* Email Address & User Type (Row 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10" // Added pr-10 for icon
                    />
                    {/* Email Icon */}
                    <Mail size={20} className="absolute right-3 top-1/2 mt-0.5 text-brand-muted pointer-events-none" />
                </div>
                <div className="relative">
                    <label htmlFor="userType" className="text-sm font-medium text-brand-muted">User Type</label>
                    {/* A select/dropdown field is used here */}
                    <div className="relative">
                        <select
                            id="userType"
                            defaultValue="" // To show 'Select User Type' as the default visible text
                            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow text-gray-400"
                        >
                            <option value="" disabled>Select User Type</option>
                            {/* Add more options here */}
                            <option value="user1">User 1</option>
                            <option value="user2">User 2</option>
                        </select>
                        {/* Custom Dropdown Icon to match the image */}
                        <ChevronDown size={20} className="absolute right-3 top-1/2 mt-0.5 transform -translate-y-1/2 text-brand-muted pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Password & Confirm Password (Row 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="relative">
                    <label htmlFor="password" className="text-sm font-medium text-brand-muted">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10" // Added pr-10 for icon
                    />
                    {/* Show/Hide Password Button */}
                    <button type="button" className="absolute right-3 top-1/2 mt-0.5 transform -translate-y-1/4 text-brand-muted">
                        <EyeOff size={20} />
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-brand-muted">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10" // Added pr-10 for icon
                    />
                    {/* Show/Hide Confirm Password Button */}
                    <button type="button" className="absolute right-3 top-1/2 mt-0.5 transform -translate-y-1/4 text-brand-muted">
                        <EyeOff size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <p className="text-brand-muted">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                <div className="flex gap-2">
                    <input type="checkbox" id="keep-logged-in" className="h-4 w-4 rounded bg-brand-glass border-gray-600 text-brand-yellow focus:ring-brand-yellow" />
                    <label htmlFor="keep-logged-in" className="text-brand-muted">By creating an account, I agree to our Terms of use and Privacy Policy </label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="keep-logged-in" className="h-4 w-4 rounded bg-brand-glass border-gray-600 text-brand-yellow focus:ring-brand-yellow" />
                    <label htmlFor="keep-logged-in" className="text-brand-muted w-100 w-lg-75">By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions. </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                <button type="submit" className="w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                    Sign Up
                </button>

                <p className="w-full text-center text-sm text-brand-muted flex items-center justify-center">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-brand-yellow hover:underline ml-1">
                        Log in
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