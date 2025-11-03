"use client";
import { useFetchPolicy, useSavePolicy } from "@/hooks/usePolicyTerms";
import RichTextEditor from "@/components/Editior";
import { CustomToast } from "@/components/ui/ReactToast";
import toast from "react-hot-toast";

export default function PrivacyPolicyPage() {

    const { data, isLoading } = useFetchPolicy("privacy");
    const { mutate, isPending } = useSavePolicy("privacy");

    const handleSave = (content: string) => {
        mutate(content, {
            onSuccess: () => {
                // CustomToast({
                //     status: "success",
                //     message: "✅ Privacy Policy updated successfully!",
                // });
                toast.custom((t) => (
                    <CustomToast t={t} status="success" message="✅ Privacy Policy updated successfully!" />
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
            <h1 className="text-2xl font-semibold text-white">Privacy Policy</h1>
            <p className="text-sm text-brand-muted mb-6">
                Manage & Update Your Privacy Policy Content
            </p>

            <RichTextEditor
                initialValue={data?.content || ""}
                title="Privacy Policy Content"
                description="Edit the privacy policy that will be displayed to your users."
                saveButtonText="Save Privacy Policy"
                onSave={handleSave}
                isSaving={isPending}
            />
        </div>
    );
}
