"use client";

import { useState } from "react";
import { Facebook, Linkedin, Twitter, Github, Youtube, Send } from "lucide-react";
import InputField from "../ui/Input";

const MultiStepForm = () => {
    const steps = [
        { id: 1, title: "General", desc: "Details listed into the General Group" },
        { id: 2, title: "Social Media", desc: "Details listed into the Social Media Group" },
        { id: 3, title: "Token Supply", desc: "Details listed into the Token Supply Group" },
        { id: 4, title: "Video Presentation", desc: "Details listed into the Video Presentation Group" },
    ];
    const [formData, setFormData] = useState({
        projectName: "",
    });
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleClose = () => {
        console.log("Form closed");
    };

    return (

        <div className="flex flex-col md:flex-row gap-8 md:gap-0  rounded-2xl  p-4  ">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 hidden md:flex">
                <ul className="relative space-y-6">
                    {steps.map((step, index) => (
                        <li key={step.id} className="relative flex items-start gap-3">
                            {/* Connecting Line */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`absolute left-[5px] top-[18px] w-[2px] h-[calc(100%+12px)] 
                                                ${index < currentStep - 1 ? "bg-brand-yellow" : "bg-gray-600"}`}
                                />
                            )}

                            {/* Step Circle */}
                            <div
                                className={`relative z-10 w-3 h-3 rounded-full mt-1 
                                     ${index < currentStep ? "bg-brand-yellow" : "bg-gray-500"}`}
                            ></div>

                            {/* Step Text */}
                            <div>
                                <h4
                                    className={`font-semibold text-sm transition 
                                        ${index < currentStep ? "text-white" : "text-gray-400"}`}
                                >
                                    {step.title}
                                </h4>
                                <p className="text-xs text-gray-500">{step.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            {/* ✅ Mobile (Horizontal Layout) */}
            <div className="block md:hidden w-full">
                <ul className="relative flex items-center justify-between">
                    {steps.map((step, index) => (
                        <li key={step.id} className="relative flex flex-col items-center text-center">
                            {/* Connecting Line */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`absolute top-[6px] left-[calc(50%+16px)] w-[calc(100%/steps.length-8px)] h-[2px] 
                                            ${index < currentStep - 1 ? "bg-brand-yellow" : "bg-gray-600"}`}
                                />
                            )}

                            {/* Step Circle */}
                            <div
                                className={`relative z-10 w-3 h-3 rounded-full mb-2 
                                             ${index < currentStep ? "bg-brand-yellow" : "bg-gray-500"}`}
                            ></div>

                            {/* Step Text */}
                            <h4
                                className={`font-semibold text-xs transition 
                                            ${index < currentStep ? "text-white" : "text-gray-400"}`}
                            >
                                {step.title}
                            </h4>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Main Form */}
            <div className="flex-1 w-full bg-[#545558]/20 backdrop-blur-[450px] rounded-md p-6 md:p-8 mx-auto max-w-[1400px]">

                {currentStep === 1 && (
                    <div className="flex flex-col gap-6">
                        {/* Header Section */}
                        <div className="border-b border-[#FFFFFF26]/85 pb-2">
                            <h2 className="text-xl md:text-2xl font-semibold text-white">
                                General
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base">
                                Details listed into the General Group
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                            <InputField
                                label="Project Name"
                                name="projectName"
                                placeholder="Enter your project name"
                                value={formData.projectName || ""}
                                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                className="flex-1"
                                required
                            />
                            <InputField
                                label="Project Name"
                                name="projectName"
                                placeholder="Enter your project name"
                                value={formData.projectName || ""}
                                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                className="flex-1"
                                required
                            />

                        </div>
                    </div>
                )}


                {currentStep === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Social Media</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Details listed into the Social Media Group
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <FormInput icon={<Facebook size={16} />} placeholder="Set Facebook link url" />
                            <FormInput icon={<Linkedin size={16} />} placeholder="Set Linkedin link url" />
                            <FormInput icon={<Twitter size={16} />} placeholder="Set Twitter link url" />
                            <FormInput icon={<Github size={16} />} placeholder="Set Github link url" />
                            <FormInput icon={<Send size={16} />} placeholder="Set Telegram link url" />
                            <FormInput icon={<Youtube size={16} />} placeholder="Set Youtube link url" />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Token Supply</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Details listed into the Token Supply Group
                        </p>
                        <div className="space-y-4">
                            <input
                                type="number"
                                placeholder="Total Supply"
                                className="w-full bg-[#2a2b30] text-gray-200 rounded-md px-4 py-2"
                            />
                            <input
                                type="number"
                                placeholder="Circulating Supply"
                                className="w-full bg-[#2a2b30] text-gray-200 rounded-md px-4 py-2"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Video Presentation</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Details listed into the Video Presentation Group
                        </p>
                        <input
                            type="text"
                            placeholder="Enter YouTube or Vimeo link"
                            className="w-full bg-[#2a2b30] text-gray-200 rounded-md px-4 py-2"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`px-6 py-2 rounded-md text-sm font-medium ${currentStep === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-600 hover:bg-gray-500 text-white"
                            }`}
                    >
                        Back
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm font-medium"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentStep === steps.length}
                            className={`px-6 py-2 rounded-md text-sm font-medium ${currentStep === steps.length
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-yellow-400 hover:bg-yellow-300 text-black"
                                }`}
                        >
                            {currentStep === steps.length ? "Finish" : "Next Step"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

const FormInput = ({ icon, placeholder }: { icon: React.ReactNode; placeholder: string }) => (
    <div className="relative">
        <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-[#FFFFFF33] text-gray-200 rounded-md px-4 py-2 pr-8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
    </div>
);


export default MultiStepForm;
