'use client'
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CustomToast } from "@/components/ui/ReactToast";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  keepLoggedIn: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Login failed");
      return result;
    },
    onSuccess: (result) => {
      login(result.user);
      if (result.user.type === "admin") {
        router.push("/admin");
      } else {

        router.push("/user/dashboard");
      }
    },
    onError: (error: any) => {
      toast.custom((t) => (
        <CustomToast
          t={t}
          status="error"
          message={error.message || "An unexpected error occurred during login."}
        />
      ))
      console.error("Login Error:", error);
    },
  });

  const onSubmit = (data: LoginFormData) => loginMutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
          className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.email ? "border-red-500" : "border-gray-600"
            }`}
          disabled={loginMutation.isPending}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div className="relative">
        <label htmlFor="password" className="text-sm font-medium text-brand-muted">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          {...register("password")}
          className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.password ? "border-red-500" : "border-gray-600"
            }`}
          disabled={loginMutation.isPending}
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-11 text-brand-muted hover:text-white transition-colors"
          disabled={loginMutation.isPending}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="keep-logged-in"
            {...register("keepLoggedIn")}
            className="h-4 w-4 rounded bg-brand-glass border-gray-600 text-brand-yellow focus:ring-brand-yellow"
          />
          <label htmlFor="keep-logged-in" className="text-brand-muted">Keep me logged in</label>
        </div>
        <Link href="/auth/forgot-password" className="font-medium underline">Forgot your password?</Link>
      </div>

      <button
        type="submit"
        className={`w-full py-3 font-bold text-black rounded-md transition-colors bg-brand-yellow ${loginMutation.isPending ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:bg-yellow-400"
          }`}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-brand-muted">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="font-medium text-brand-yellow hover:underline ml-1">
          Sign up
        </Link>
      </p>

      <div className="flex items-center gap-4">
        <hr className="w-full border-gray-600" />
        <span className="text-brand-muted">OR</span>
        <hr className="w-full border-gray-600" />
      </div>

      <SocialLoginButtons />
    </form>
  );
};
