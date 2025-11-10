"use client";
import { CustomToast } from "@/components/ui/ReactToast";
import { useMutation } from "@tanstack/react-query";
import { MoveUpRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const ForgetForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");

    // ✅ Mutation for submitting email
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem("reset_email", email);

            toast.custom((t) => (
                <CustomToast t={t} status="Success" message={data.message} />
            ));
            // You can store the code in localStorage (temporary) for testing
            router.push("/auth/verify-otp");
        },
        onError: (error: any) => {
            toast.custom((t) => (
                <CustomToast t={t} status="Error" message={error.message} />
            ));
        },
    });

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
            </div>

            <button type="submit"
                disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50" >

                {mutation.isPending ? "Sending..." : "Send Verification Code"}
                <MoveUpRight className="w-4 h-4" />
            </button>
        </form>
    )
}