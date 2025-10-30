"use client";

import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { ChevronDown, Eye, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CustomToast } from "@/components/ui/ReactToast";


export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    userType: z
      .string()
      .refine((value) => ["user", "investor"].includes(value), {
        message: "User type must be either 'user' or 'investor'",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    // keepLoggedIn: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match with password",
    path: ["confirmPassword"], // error will appear under confirmPassword
  });


type SignUpFormData = z.infer<typeof SignUpSchema>;
export const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });
  // ✅ Mutation for signup
  const signupMutation = useMutation({
    mutationFn: async (data: SignUpFormData) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Signup failed");
      return result;
    },
    onSuccess: (result) => {
      toast.custom((t) => (
        <CustomToast
          t={t}
          status="Success"
          message={result.message || "Account created successfully!"}
        />
      ));
      reset();
      router.push("/auth/login");
    },
    onError: (error: any) => {
      toast.custom((t) => (
        <CustomToast
          t={t}
          status="error"
          message={error.message || "An unexpected error occurred during signup."}
        />
      ));
      console.error("Signup Error:", error);
    },
  });
  const onSubmit = (data: SignUpFormData) => signupMutation.mutate(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            status="error"
            message={data.message || "Signup Failed"}
          />
        ));
        return;
      }
      toast.custom((t) => (
        <CustomToast
          t={t}
          status="error"
          message={data.message || "Account created successfully!"}
        />
      ));
      router.push("/auth/login");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-brand-muted">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            {...register("firstName")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.firstName ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          />
          {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-brand-muted">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            {...register("lastName")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.lastName ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          />
          {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}

        </div>
      </div>

      {/* Email & User Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label htmlFor="email" className="text-sm font-medium text-brand-muted">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10 ${errors.email ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          />
          <Mail size={20} className="absolute right-3 top-11 text-brand-muted pointer-events-none" />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}

        </div>

        <div className="relative">
          <label htmlFor="userType" className="text-sm font-medium text-brand-muted">
            User Type
          </label>
          <select
            id="userType"
            {...register("userType")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow text-gray-400 ${errors.userType ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          >
            <option value="" disabled>Select User Type</option>
            <option value="user">User</option>
            <option value="investor">Investor</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-muted pointer-events-none" />
          {errors.userType && <p className="text-sm text-red-500 mt-1">{errors.userType.message}</p>}

        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium text-brand-muted">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.password ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-11 text-brand-muted hover:text-white transition-colors"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}

        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-brand-muted">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className={`w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow ${errors.confirmPassword ? "border-red-500" : "border-gray-600"
              }`}
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((p) => !p)}
            className="absolute right-3 top-11 text-brand-muted hover:text-white transition-colors"
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
        <button
          type="submit"
          className={`w-full py-3 font-bold text-black rounded-md transition-colors bg-brand-yellow ${signupMutation.isPending || !isValid ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:bg-yellow-400"
            }`}
          disabled={signupMutation.isPending || !isValid}
        >
          {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
        </button>
        <p className="w-full text-center text-sm text-brand-muted flex items-center justify-center">
          Already have an account?
          <Link href="/auth/login" className="font-medium text-brand-yellow hover:underline ml-1">
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
  );
};
