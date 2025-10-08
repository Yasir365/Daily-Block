"use client";
import { AuthImage } from "@/components/auth/AuthImage";
import { ForgetForm } from "./ForgetForm";
const authImage = "/svg/auth2.svg";

export default function Page() {
    return (
        <main className="container mx-auto flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10 rounded-xl shadow-lg overflow-hidden">

                {/* Left Side: Login Form */}
                <div className="relative p-6 sm:p-12 flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-[#8E8E93] opacity-[.3] rounded-xl"></div>
                    <h1 className="text-[42px] font-bold">Reset Your Password!</h1>
                    <p className="text-brand-muted mb-6">Please enter the email address linked to your account. We’ll email you a Verification code to create a new password.</p>
                    <ForgetForm></ForgetForm>
                </div>

                {/* Right Side: QR Code & Illustration */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <AuthImage img={authImage}></AuthImage>
                </div>

            </div>
        </main>
    );
}
