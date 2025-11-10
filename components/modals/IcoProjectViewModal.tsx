"use client";
import React from "react";
import { X, ExternalLink } from "lucide-react";
import { UniversalContainer } from "@/components/ui/UniversalContainer";
import Image from "next/image";
import { formatDateTime } from "@/lib/helpers";

interface IcoProjectViewModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export default function IcoProjectViewModal({
  open,
  onClose,
  data,
}: IcoProjectViewModalProps) {
  if (!open) return null;

  const ignoredKeys = ["_id", "userId", "unreadMessages", "unreadMessageCount"];
  // Helper to format labels
  const formatLabel = (key: string) => {
    let label = key.replace(/_/g, " ");
    label = label.replace(/([a-z])([A-Z])/g, "$1 $2");
    label = label.replace(/\b\w/g, (char) => char.toUpperCase());
    return label;
  };

  // Separate userInfo & faqs from other fields
  const otherFields: [string, any][] = [];
  let userInfo: any = null;
  let faqs: any = null;

  Object.entries(data || {}).forEach(([key, value]) => {
    if (!value || ignoredKeys.includes(key)) return;
    if (key === "userInfo") userInfo = value;
    else if (key === "faqs") faqs = value;
    else otherFields.push([key, value]);
  });

  const renderField = (key: string, value: any) => {

    const label = formatLabel(key);
    // Links
    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <div key={key} className="mb-3">
          <p className="text-gray-400 font-medium capitalize">{label}</p>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FACC15] hover:underline flex items-center gap-1 break-words"
          >
            {value} <ExternalLink size={14} />
          </a>
        </div>
      );
    }
    // Images
    if (typeof value === "string" && value.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
      return (
        <div key={key} className="mb-3">
          <p className="text-gray-400 font-medium capitalize">{label}</p>
          <div className="relative w-25 h-25 rounded-md overflow-hidden border border-[#2E2E2E]">
            <Image
              src={value}
              alt={key}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      );
    }
    // Array of non-objects
    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-3">
          <p className="text-gray-400 font-medium capitalize">{label}</p>
          <div className="ml-2 space-y-1">
            {value.map((item: any, idx: number) => (
              <p key={idx} className="text-gray-300 text-sm capitalize">{item}</p>
            ))}
          </div>
        </div>
      );
    }
    // Default
    return (
      <div key={key} className="mb-3">
        <p className="text-gray-400 font-medium capitalize">{label}</p>
        <p className="text-gray-200 break-words capitalize">{(key === "updatedAt" || key === "createdAt") ? formatDateTime(value) : String(value)}</p>
      </div>
    );
  };

  const renderUserInfo = () => {
    if (!userInfo) return null;
    const { firstName, lastName, email, userType, status, avatar } = userInfo;
    return (
      <div className="mb-6 p-4 bg-[#1E1E1E] border border-[#2E2E2E] rounded-lg col-span-full flex flex-col md:flex-row items-center md:items-start gap-4">
        {avatar && (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border border-[#2E2E2E]"
          />
        )}
        <div className="flex-1 space-y-1">
          <h3 className="text-[#FACC15] font-semibold text-lg mb-1">User Info</h3>
          <p className="capitalize"><span className="text-gray-400 font-medium ">First Name:</span> {firstName}</p>
          <p className="capitalize"><span className="text-gray-400 font-medium ">Last Name:</span> {lastName}</p>
          <p><span className="text-gray-400 font-medium">Email:</span> {email}</p>
          <p className="capitalize"><span className="text-gray-400 font-medium ">User Type:</span> {userType}</p>
          <p className="capitalize"><span className="text-gray-400 font-medium ">Status:</span> {status}</p>
        </div>
      </div>
    );
  };

  const renderFaqs = () => {
    if (!faqs || !Array.isArray(faqs)) return null;
    return (
      <div className="mb-6 col-span-full">
        <h3 className="text-[#FACC15] font-semibold mb-2">FAQs</h3>
        <div className="space-y-3">
          {faqs.map((faq: any, i: number) => (
            <div key={i} className="p-3 bg-[#1E1E1E] border border-[#2E2E2E] rounded-lg">
              <p className="text-gray-400 font-medium">{faq.question}</p>
              <p className="text-gray-200">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <UniversalContainer
        size="full"
        className="w-full max-w-[90%] h-full max-h-[90%] overflow-hidden p-6 bg-gradient-to-br from-[#121212] to-[#141B1F] border border-[#364349] rounded-[20px] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#F8FAFC] font-inter font-semibold text-[22px]">
            ICO Project Details
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              {otherFields.map(([key, value]) => renderField(key, value))}
              {renderUserInfo()}
              {renderFaqs()}
            </div>
          ) : (
            <p className="text-gray-400">No data available.</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[10px] border border-[#3B3B3B] bg-[#3B3B3B] text-[#F8FAFC] font-semibold hover:bg-[#4B4B4B]"
          >
            Close
          </button>
        </div>
      </UniversalContainer>
    </div>
  );
}
