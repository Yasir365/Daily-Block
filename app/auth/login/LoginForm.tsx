'use client'
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { EyeOff, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Post_loginUser } from "@/lib/api/auth"
import { useAuth } from "@/hooks/useAuth"
import { CustomToast } from "@/components/ui/ReactToast"
import InputField from "@/components/ui/Input"

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    keepLoggedIn: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof LoginSchema>

const loginUser = async (data: LoginFormData) => {
    return await Post_loginUser(data)
}

export const LoginForm = () => {
    const router = useRouter()
    const { login } = useAuth()
    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            keepLoggedIn: false,
        },
    })

    // Dummy login 
    const dumyloginUser = async (data: LoginFormData) => {
        router.push("/user/dashboard")
        return await Post_loginUser(data)
    }

    const loginMutation = useMutation({
        mutationFn: dumyloginUser,
        onSuccess: (data: any) => {
            login(data)

            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="Success"
                    message={data.message || "Login successful!"}
                />
            ));
            router.push("/")
        },
        onError: (error: any) => {
            const errorMessage = error.message || "An unexpected error occurred during login."
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message={errorMessage}
                />
            ));
            console.error("Login Error:", error)
        },
    })

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data)
    }

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => setShowPassword(prev => !prev)

    const isLoading = loginMutation.isPending

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                {/* Email Field */}
                <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={watch("email")}
                    onChange={(e) => setValue("email", e.target.value)}
                    required
                    disabled={isLoading}
                    inputClass={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.email ? "border-red-500" : "border-gray-600"}`}
                    lblCls="text-sm font-medium text-brand-muted"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}

            </div>

            <div className="relative">
                {/* Password Field */}
                <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="........."
                    value={watch("password")}
                    onChange={(e) => setValue("password", e.target.value)}
                    required
                    disabled={isLoading}
                    inputClass={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.password ? "border-red-500" : "border-gray-600"}`}
                    lblCls="text-sm font-medium text-brand-muted"
                    icon={showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    iconPlace="right"
                    onIconClick={togglePasswordVisibility}
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}

            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="keep-logged-in"
                        {...register("keepLoggedIn")}
                        className="h-4 w-4 rounded bg-brand-glass border-gray-600 
                        text-brand-yellow accent-brand-yellow 
                        focus:ring-brand-yellow focus:ring-offset-0"
                        disabled={isLoading}
                    />

                    <label htmlFor="keep-logged-in" className="text-brand-muted">Keep me logged in</label>
                </div>
                <Link href="/auth/forgot-password" className="font-medium underline">Forgot your password?</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                <button
                    type="submit"
                    className={`w-full py-3 font-bold text-black rounded-md transition-colors bg-brand-yellow ${isLoading || !isValid ? " cursor-not-allowed" : ""}`}
                    disabled={isLoading || !isValid}
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <p className="w-full text-center text-sm text-brand-muted flex items-center justify-center">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="font-medium text-brand-yellow hover:underline ml-1">
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