import RichTextEditor from "@/components/Editior";

export default function PrivacyPolicyPage() {
    const initialContent = "";

    return (
        <div className="min-h-screen text-white">
            <h1 className="text-2xl font-semibold text-white">Privacy Policy</h1>
            <p className="text-sm text-brand-muted mb-6">
                Manage & Update Your Privacy Policy Content
            </p>

            <RichTextEditor
                initialValue={initialContent}
                title="Privacy Policy Content"
                description="Edit the privacy policy that will be displayed to your users."
                saveButtonText="Save Privacy Policy"
            />
        </div>
    );
}