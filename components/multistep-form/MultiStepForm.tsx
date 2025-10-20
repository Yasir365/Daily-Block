"use client";

import { useState } from "react";
import StepGeneral from "./StepGeneral";
import StepSocialMedia from "./StepSocialMedia";
import StepTokenSupply from "./StepTokenSupply";
import StepVideoPresentation from "./StepVideoPresentation";
import FaqSection from "./FaqSection";

const steps = [
    { id: 1, title: "General", desc: "Details listed into the General Group" },
    { id: 2, title: "Social Media", desc: "Details listed into the Social Media Group" },
    { id: 3, title: "Token Supply", desc: "Details listed into the Token Supply Group" },
    { id: 3, title: "FAQ's", desc: "Detail Listed into the Video Presentation Group" },
    { id: 4, title: "Video Presentation", desc: "Details listed into the Video Presentation Group" },
];

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleClose = () => console.log("Form closed");
    const handleSubmit = () => console.log("Final form data:", formData);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 rounded-2xl p-4">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 hidden md:flex">
                <ul className="relative space-y-6">
                    {steps.map((step, index) => (
                        <li key={step.id} className="relative flex items-start gap-3">
                            {index !== steps.length - 1 && (
                                <div
                                    className={`absolute left-[5px] top-[18px] w-[2px] h-[calc(100%+12px)] ${index < currentStep - 1 ? "bg-brand-yellow" : "bg-gray-600"
                                        }`}
                                />
                            )}
                            <div
                                className={`relative z-10 w-3 h-3 rounded-full mt-1 ${index < currentStep ? "bg-brand-yellow" : "bg-gray-500"
                                    }`}
                            ></div>
                            <div>
                                <h4
                                    className={`font-semibold text-sm transition ${index < currentStep ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    {step.title}
                                </h4>
                                <p className="text-xs text-gray-500">{step.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full bg-brand-glass/50 rounded-md p-6 md:p-8 mx-auto max-w-[1600px] relative">
                {currentStep === 1 && (
                    <StepGeneral data={formData} onChange={handleChange} />
                )}
                {currentStep === 2 && (
                    <StepSocialMedia data={formData} onChange={handleChange} />
                )}
                {currentStep === 3 && (
                    <StepTokenSupply data={formData} onChange={handleChange} />
                )}
                {currentStep === 4 && (
                    <FaqSection data={formData} onChange={handleChange} />
                )}
                {currentStep === 5 && (
                    <StepVideoPresentation data={formData} onChange={handleChange} />
                )}

                {/* Buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep !== 1 && (
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`px-10 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted`}
                        >
                            Back
                        </button>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="px-10 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted"
                        >
                            Close
                        </button>
                        <button
                            onClick={currentStep === steps.length ? handleSubmit : handleNext}
                            className={`px-6 py-2 rounded-md text-sm font-medium bg-brand-yellow text-black`}
                        >
                            {currentStep === steps.length ? "Submit For Approval" : "Next Step"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
