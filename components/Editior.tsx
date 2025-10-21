"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Save } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for client-side rendering
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// React-Quill toolbar configuration
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ],
};


interface EditorProps {
    initialValue?: string;
    title: string;
    description: string;
    saveButtonText: string;
}

export default function RichTextEditor({ initialValue = "", title, description, saveButtonText, }: EditorProps) {
    const [content, setContent] = useState(initialValue);
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div className="bg-brand-glass/50 p-6 rounded-lg shadow-xl">
            {/* Dynamic Content */}
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-brand-muted mb-6">
                {description}
            </p>

            {/* Editor Label */}
            <label className="block text-sm font-medium text-white mb-2">
                Content
            </label>

            {/* React-Quill Editor */}
            <div className="rounded-xl overflow-hidden border border-brand-glass">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="snow"
                    placeholder="Write your content here."
                    className="text-white"
                    style={{
                        height: "400px",
                        color: "#ffffff",
                        border: "none",
                    }}
                />
            </div>

            <p className="text-sm text-gray-400 mt-16 mb-6">
                Write your content here. Use markdown formatting if needed.
            </p>

            {/* Action Buttons */}
            <div className="flex-col md:flex-row flex gap-4 mt-6">
                <button
                    disabled={isSaving}
                    className="flex items-center justify-center px-6 py-2 bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors disabled:bg-yellow-800 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            {/* Dynamic Button Text */}
                            {saveButtonText}
                        </>
                    )}
                </button>
                <button className="px-6 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
}