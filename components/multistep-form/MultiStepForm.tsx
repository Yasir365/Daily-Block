"use client";

import { useState } from "react";
import StepGeneral from "./StepGeneral";
import StepSocialMedia from "./StepSocialMedia";
import StepTokenSupply from "./StepTokenSupply";
import StepVideoPresentation from "./StepVideoPresentation";
import FaqSection from "./FaqSection";
import { useRouter } from "next/navigation";

const steps = [
    { id: 1, title: "General", desc: "Details listed into the General Group" },
    { id: 2, title: "Social Media", desc: "Details listed into the Social Media Group" },
    { id: 3, title: "Token Supply", desc: "Details listed into the Token Supply Group" },
    { id: 3, title: "FAQ's", desc: "Detail Listed into the Video Presentation Group" },
    { id: 4, title: "Video Presentation", desc: "Details listed into the Video Presentation Group" },
];

const MultiStepForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const handleNext = async() => {
        const formDataToSend = new FormData();
        for (const key in formData) {
        const value = formData[key];
        if (value !== undefined && value !== null) {
            if (typeof value === "object" && !(value instanceof File)) {
                formDataToSend.append(key, JSON.stringify(value));
            } else {
                formDataToSend.append(key, value);
            }
        }
        }

        const response = await fetch("/api/ico/add", {
            method: "POST",
            body: formDataToSend
        });
        const result = await response.json();
        if(result.success){
            console.log("Successfully saved ", result.data);
            handleChange("_id",result.data._id);
            setCurrentStep(currentStep + 1)
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleClose = () => console.log("Form closed");
    const handleSubmit = async() => {
        const formDataToSend = new FormData();
        for(const key in formData){
            if(formData[key] !== undefined && formData[key] !== null ){
                formDataToSend.append(key, formData[key])
            }
        }
        console.log("Final form data:", formData);
        const response = await fetch("/api/ico/add", {
            method: "POST",
            body: formDataToSend
        });
        const result = await response.json();
        if(result.success){
            console.log("Successfully saved ", result.data);
            handleChange("_id",result.data._id);
            setCurrentStep(currentStep + 1)
            router.push("/user/dashboard");
        }else {
            console.error("Failed to save:", result.error);
            alert("Error saving project: " + result.error);
        }

    } 

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 rounded-2xl">
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
            <div className="w-full md:hidden flex flex-row justify-between items-start relative overflow-x-auto no-scrollbar py-6 px-2">
                {/* Connecting Line */}
                <div className="absolute top-[33px] left-10 right-0 h-[2px] w-[calc(100%-52px)] bg-gray-700 z-0" />

                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className="relative flex flex-col items-center flex-shrink-0 w-20 text-center z-10"
                    >
                        {/* Circle */}
                        <div
                            className={`w-5 h-5 rounded-full border-2 ${index < currentStep
                                ? "border-brand-yellow bg-brand-yellow"
                                : "border-gray-600 bg-gray-800"
                                }`}
                        ></div>

                        {/* Step Title */}
                        <h4
                            className={`mt-3 text-[11px] font-semibold ${index < currentStep ? "text-white" : "text-gray-400"
                                }`}
                        >
                            {step.title}
                        </h4>

                        {/* Step Description */}
                        <p className="text-[10px] text-gray-500 leading-tight">{step.desc}</p>
                    </div>
                ))}
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
                <div className="flex flex-col md:flex-row justify-between mt-8 gap-4 md:gap-0">
                    {/* Back Button */}
                    {currentStep !== 1 && (
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-8 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted w-full md:w-auto"
                        >
                            Back
                        </button>
                    )}

                    {/* Right Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleClose}
                            className="px-8 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted w-full sm:w-auto"
                        >
                            Close
                        </button>

                        <button
                            onClick={currentStep === steps.length ? handleSubmit : handleNext}
                            className="px-6 py-2 rounded-md text-sm font-medium bg-brand-yellow text-black w-full sm:w-auto"
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
