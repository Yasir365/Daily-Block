"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/Input";
import Teextarea from "@/components/ui/Textarea";
import SelectField from "@/components/ui/Select";
import { X } from "lucide-react";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CustomToast } from "../ui/ReactToast";
import toast from "react-hot-toast";

type Props = {
    onClose: () => void;
    onSuccess?: () => void;
    mode?: "create" | "edit";
    initialData?: any;
};

// ✅ Schema validation using Zod
const BlogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters long"),
    content: z.string().min(20, "Content must be at least 20 characters long"),
    status: z.enum(["draft", "published", "live", "archived", "blocked"]),
});

type BlogFormData = z.infer<typeof BlogSchema>;


const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "live", label: "Live" },
    { value: "archived", label: "Archived" },
    { value: "blocked", label: "Blocked" },
];

const CreateBlogForm: React.FC<Props> = ({ onClose, onSuccess, mode = "create", initialData }) => {
    const {
        handleSubmit, control,

        formState: { errors, isValid },
        reset,
    } = useForm<BlogFormData>({
        resolver: zodResolver(BlogSchema),
        mode: "onBlur",
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            status: "draft",
        },
    });

    useEffect(() => {
        if (initialData) reset(initialData);
        else reset({
            title: "",
            excerpt: "",
            content: "",
            status: "draft",
        });
    }, [initialData, reset]);
    // ✅ Mutation for API call
    const createBlogMutation = useMutation({
        mutationFn: async (data: BlogFormData) => {
            let url = "/api/blogs";
            let method = "POST";

            if (mode === "edit" && initialData?._id) {
                url = `/api/blogs?id=${initialData._id}`;
                method = "PATCH";
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="success"
                    message={
                        mode === "edit"
                            ? "✅ Blog updated successfully!"
                            : "🎉 Blog created successfully!"
                    }
                />
            ));
            onSuccess?.();
            onClose();
        },
        onError: (err: any) => {
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    status="error"
                    message={err.message || "❌ Something went wrong while saving blog."}
                />
            ));
        },
    });


    const onSubmit = (data: BlogFormData) => {
        createBlogMutation.mutate(data);
    };


    return (
        <div className="absolute right-0 mt-2 w-[896px] max-w-[896px] p-6 bg-gradient-to-br from-[#121212] to-[#141B1F]
      border border-[#364349] rounded-[12px] shadow-[0_1px_2px_0_#0000000D] backdrop-blur-[4px] z-50">
            <div className="flex justify-end">
                <button onClick={onClose}>
                    <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </button>
            </div>

            <h2 className="text-[#F8FAFC] font-inter font-semibold text-[18px] mb-1">{mode === "create" ? "Create New " : "Edit "}Blog Post</h2>
            <p className="font-inter font-normal text-[14px] text-slate-400 mb-6">
                {mode === "create" ? "Create a new blog post" : "Edit"} blog post for your audience
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <InputField {...field} label="Title" placeholder="Enter Blog Title" />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>
                    )}
                />

                {/* Excerpt */}
                <Controller
                    name="excerpt"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Teextarea
                                {...field}
                                label="Excerpt"
                                placeholder="Brief description..."
                                rows={4}
                            />
                            {errors.excerpt && (
                                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
                            )}
                        </div>
                    )}
                />

                {/* Content */}
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Teextarea
                                {...field}
                                label="Content"
                                placeholder="Write full content..."
                                rows={8}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                            )}
                        </div>
                    )}
                />

                {/* Status */}
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <SelectField
                                label="Status"
                                options={statusOptions}
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                            />
                            {errors.status && (
                                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                            )}
                        </div>
                    )}
                />

                <div className="flex gap-2 mt-6">
                    <button
                        type="submit"
                        disabled={createBlogMutation.isPending}
                        className="w-full h-[40px] rounded-[10px] bg-[#FACC15] text-black font-semibold disabled:opacity-50"
                    >
                        {createBlogMutation.isPending
                            ? mode === "edit"
                                ? "Updating..."
                                : "Creating..."
                            : mode === "edit"
                                ? "Update Blog"
                                : "Create Blog"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full h-[40px] rounded-[10px] border border-[#3B3B3B] bg-[#0D0E12] text-[#F8FAFC] font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </form>


        </div>
    );
};

export default CreateBlogForm;
