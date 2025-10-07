"use client";
import { AuthImage } from "@/components/auth/AuthImage";
import { QrCode } from "@/components/auth/QrCode";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { SignupForm } from "./SignupForm";
const authImage = "/svg/login.svg";

export default function Page() {
    return (
        <main className="container mx-auto flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10 rounded-xl shadow-lg overflow-hidden">

                {/* Left Side: Login Form */}
                <div className="relative p-6 sm:p-12 flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-[#8E8E93] opacity-[.3] rounded-xl"></div>
                    <AuthButtons active="signup"></AuthButtons>
                    <h1 className="text-[42px] mt-[20px] font-bold">Create an account at DailyBlock!</h1>
                    <p className="text-brand-muted mb-6">Please Create an Account for free to access.</p>
                    <SignupForm></SignupForm>
                </div>

                {/* Right Side: QR Code & Illustration */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <QrCode></QrCode>
                    <div className="mt-8 relative w-full max-w-md">
                        <AuthImage img={authImage}></AuthImage>
                    </div>
                </div>

            </div>
        </main>
    );
}
