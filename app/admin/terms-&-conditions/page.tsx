// components/TermsAndConditionsPage.jsx
"use client";
import RichTextEditor from "@/components/Editior";
import { CustomToast } from "@/components/ui/ReactToast";
import { useFetchPolicy, useSavePolicy } from "@/hooks/usePolicyTerms";
import toast from "react-hot-toast";

export default function TermsAndConditionsPage() {
    const { data, isLoading } = useFetchPolicy("terms");
    const { mutate, isPending } = useSavePolicy("terms");

    const handleSave = (content: string) => {
        mutate(content, {
            onSuccess: () => {
                // CustomToast({
                //     status: "success",
                //     message: "✅ Privacy Policy updated successfully!",
                // });
                toast.custom((t) => (
                    <CustomToast t={t} status="success" message="✅ Terms & Conditions updated successfully!" />
                ));
            },
            onError: (err: any) => {
                toast.custom((t) => (
                    <CustomToast t={t} status="error" message={err.message || "Something went wrong!"} />
                ));
                // CustomToast({
                //     status: "error",
                //     message: err.message || "Something went wrong!",
                // });
            },
        });
    };

    if (isLoading) return <p className="text-gray-400">Loading...</p>;


    return (
        <div className="min-h-screen text-white">
            <h1 className="text-2xl font-semibold text-white">Terms & Conditions</h1>
            <p className="text-sm text-brand-muted mb-6">
                Manage & Update Your Terms & Conditions Content
            </p>

            {/* ✅ Render Generic Editor Component with Terms-Specific Props */}
            <RichTextEditor
                initialValue={data?.content || ""}
                title="Terms & Conditions Content"
                description="Edit the terms and conditions that govern the use of your service."
                saveButtonText="Save Terms"
                onSave={handleSave}
                isSaving={isPending}
            />
        </div>
    );
}