"use client";
import { CustomToast } from "@/components/ui/ReactToast";
import { Input } from "antd";
import { MoveUpRight } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const VerifyOtpForm = () => {
    const router = useRouter();

    const [otp, setOtp] = useState("");

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = localStorage.getItem("reset_email");

        try {
            const res = await fetch("/api/auth/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem("otp_verified", "true");
            localStorage.setItem("otp", otp);

            toast.custom((t) => (
                <CustomToast t={t} status="Success" message="Code verified successfully!" />
            ));
            router.push("/auth/reset-password");
        } catch (error: any) {
            toast.custom((t) => (
                <CustomToast t={t} status="Error" message={error.message} />
            ));
        }
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-muted">Code</label>
                <div
                    className="w-full  mt-2   "
                >
                    <Input.OTP
                        id="otp"
                        length={5}
                        formatter={(str) => str.toUpperCase()}
                        onChange={(value) => setOtp(value)}
                        className="w-full text-center font-semibold tracking-widest "
                    />
                </div>
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                Verify Code
                <MoveUpRight className="w-4 h-4" />
            </button>

            <p className="text-brand-muted text-center text-sm">
                Wrong Mail
                <Link href="/auth/forgot-password" className="text-white ml-1">Send to different email</Link>
            </p>
        </form>
    )
}