"use client";
import React from "react";
import { X } from "lucide-react";
import { UniversalContainer } from "@/components/ui/UniversalContainer";
import SelectField from "@/components/ui/Select";
import InputField from "@/components/ui/Input";

interface UserUpdateModalProps {
    open: boolean;
    onClose: () => void;
    user: any; // 👈 can replace with a proper type later
    onSave: (updatedUser: any) => void;
    isSaving?: boolean;
}

const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
];

export default function UserUpdateModal({
    open,
    onClose,
    user,
    onSave,
    isSaving = false,
}: UserUpdateModalProps) {
    const [form, setForm] = React.useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        status: user?.status || "active",
        _id: user?._id,
    });
    React.useEffect(() => {
        if (user) {
            setForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                status: user.status || "active",
                _id: user._id,
            });
        }
    }, [user]);

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <UniversalContainer
                size="lg"
                className="w-[90%] max-w-lg p-6 bg-gradient-to-br from-[#121212] to-[#141B1F] border border-[#364349] rounded-[16px] shadow-lg"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#F8FAFC] font-inter font-semibold text-[20px]">
                        Update User
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Fields */}
                <div className="space-y-5">
                    <InputField
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                    />
                    <InputField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter email"
                        disabled
                    />
                    <SelectField
                        label="Status"
                        name="status"
                        options={statusOptions}
                        value={form.status}
                        onChange={(value) => handleChange("status", value)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-[10px] border border-[#3B3B3B] bg-[#3B3B3B] text-[#F8FAFC] font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="px-6 py-2 rounded-[10px] bg-[#FACC15] text-black font-semibold"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Update"}
                    </button>
                </div>
            </UniversalContainer>
        </div>
    );
}
