"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { subscribeToNewsletter } from "@/services/newsletterService";
import { CustomToast } from "../ui/ReactToast";

// --- Zod Schema for Validation ---
const NewsletterSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormData = z.infer<typeof NewsletterSchema>;

export const NewsletterForm = () => {
    const queryClient = useQueryClient();

    // --- React Hook Form Setup ---
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<NewsletterFormData>({
        resolver: zodResolver(NewsletterSchema),
        mode: "onChange",
    });

    // --- React Query Mutation ---
    const mutation = useMutation({
        mutationFn: (data: NewsletterFormData) => subscribeToNewsletter(data.email),
        onSuccess: (data) => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="Success"
                    message="Subscribed successfully"
                />
            ))
            reset();
            // ✅ Optionally refresh subscriber list
            // queryClient.invalidateQueries(["subscribers"]);
        },
        onError: (err: any) => {
            toast.error(err.message || "Subscription failed");
        },
    });

    const onSubmit = (data: NewsletterFormData) => {
        mutation.mutate(data);
    };

    const isLoading = mutation.isPending;

    // Conditional styling for the input box
    const inputClasses = `
    w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow
    ${errors.email ? "border-red-500" : "border-brand-muted"}
  `;

    return (
        <div className="md:w-1/2 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className={inputClasses}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <p className="text-gray-400 text-xs flex items-center justify-between">
                    <span>
                        We care about your data in our&nbsp;
                        <Link href="/privacy-policy" className="underline text-gray-400 hover:text-white transition-colors">
                            privacy policy
                        </Link>
                    </span>
                </p>

                <button
                    type="submit"
                    className={`
            w-full py-3 font-bold text-black rounded-lg 
            transition-colors duration-200 bg-brand-yellow
            ${isLoading || !isValid ? "cursor-not-allowed" : ""}
          `}
                    disabled={isLoading || !isValid}
                >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
        </div>
    );
};
