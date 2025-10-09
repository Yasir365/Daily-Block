"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Link from "next/link";

// --- Zod Schema for Validation ---
const NewsletterSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormData = z.infer<typeof NewsletterSchema>;

export const NewsletterForm = () => {
    // --- React Hook Form Setup ---
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(NewsletterSchema),
        mode: "onChange",
    });

    // --- React Query Mutation ---
    const mutation = useMutation({
        // mutationFn: subscribeToNewsletter,
        // onSuccess: (data) => {
        //     toast.success(data.message || "Subscribed successfully! Check your inbox.");
        //     reset(); // Clear the form on success
        // },
        // onError: (error: any) => {
        //     const errorMessage = error.response?.data?.message || "Subscription failed. Please try again.";
        //     toast.error(errorMessage);
        // },
    });

    const onSubmit = (data: NewsletterFormData) => {
        // mutation.mutate(data);
    };

    const isLoading = mutation.isPending;

    // Conditional styling for the input box
    const inputClasses = `
        w-full p-3 mt-2 bg-brand-glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow
        ${errors.email ? "border-red-500" : "border-brand-muted"}
    `;

    return (
        <div className="md:w-1/2 flex flex-col justify-center">
            {/* Form Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Input Field */}
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className={inputClasses}
                        disabled={isLoading}
                    />
                    {/* Error Message */}
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Privacy Policy Link */}
                <p className="text-gray-400 text-xs flex items-center justify-between">
                    <span>We care about your data in our&nbsp;
                        <Link href="/privacy-policy" className="underline text-gray-400 hover:text-white transition-colors">
                            privacy policy
                        </Link>
                    </span>
                </p>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`
                        w-full py-3 font-bold text-black rounded-lg 
                        transition-colors duration-200 bg-brand-yellow
                        ${isLoading || !isValid
                            ? "cursor-not-allowed"
                            : ""
                        }
                    `}
                    disabled={isLoading || !isValid}
                >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
        </div>
    );
};