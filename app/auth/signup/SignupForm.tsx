"use client";

import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { ChevronDown, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

export const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });

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
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={submitForm}>
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
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-brand-muted">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
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
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10"
          />
          <Mail size={20} className="absolute right-3 top-1/2 mt-0.5 text-brand-muted pointer-events-none" />
        </div>

        <div className="relative">
          <label htmlFor="userType" className="text-sm font-medium text-brand-muted">
            User Type
          </label>
          <select
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow text-gray-400"
          >
            <option value="" disabled>Select User Type</option>
            <option value="user">User</option>
            <option value="investor">Investor</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-muted pointer-events-none" />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium text-brand-muted">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-brand-muted">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
        <button
          type="submit"
          className="w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors"
        >
          Sign Up
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
