"use client";
import InputField from "@/components/ui/Input";
import { CustomToast } from "@/components/ui/ReactToast";
import { Eye, EyeOff, MoveUpRight } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const ResetForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message={"Password reset successfully!"}
            />
        ));
        router.push("/auth/login");
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            {/* Password Field */}
            <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password} // you can integrate react-hook-form or state if needed
                onChange={(e) => setPassword(e.target.value)} // temporary, replace with state or form handler
                required
                icon={showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                iconPlace="right"
                onIconClick={togglePassword}
                inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                lblCls="text-sm font-medium text-brand-muted"
            />

            {/* Confirm Password Field */}
            <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                icon={showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                iconPlace="right"
                onIconClick={toggleConfirmPassword}
                inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                lblCls="text-sm font-medium text-brand-muted"
            />

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