// components/TermsAndConditionsPage.jsx

import RichTextEditor from "@/components/Editior";

export default function TermsAndConditionsPage() {
    const initialContent = "";

    return (
        <div className="min-h-screen text-white">
            <h1 className="text-2xl font-semibold text-white">Terms & Conditions</h1>
            <p className="text-sm text-brand-muted mb-6">
                Manage & Update Your Terms & Conditions Content
            </p>

            {/* ✅ Render Generic Editor Component with Terms-Specific Props */}
            <RichTextEditor
                initialValue={initialContent}
                title="Terms & Conditions Content"
                description="Edit the terms and conditions that govern the use of your service."
                saveButtonText="Save Terms"
            />
        </div>
    );
}