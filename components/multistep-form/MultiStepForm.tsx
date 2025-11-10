"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import StepGeneral from "./StepGeneral";
import StepSocialMedia from "./StepSocialMedia";
import StepTokenSupply from "./StepTokenSupply";
import StepVideoPresentation from "./StepVideoPresentation";
import FaqSection from "./FaqSection";

import { combinedSchema, stepGeneralSchema } from "@/schemas/coinSchema";
import { stepSocialMediaSchema } from "@/schemas/socialMediaSchema";
import { stepTokenSupplySchema } from "@/schemas/tokenSupplySchema";
import { useQueryClient } from "@tanstack/react-query";

const steps = [
    { id: 1, title: "General", desc: "Details listed into the General Group" },
    { id: 2, title: "Social Media", desc: "Details listed into the Social Media Group" },
    { id: 3, title: "Token Supply", desc: "Details listed into the Token Supply Group" },
    { id: 4, title: "FAQ's", desc: "Detail Listed into the FAQ Group" },
    { id: 5, title: "Video Presentation", desc: "Details listed into the Video Presentation Group" },
];
type CombinedFormType = z.infer<typeof combinedSchema>;

const getStepSchema = (step: number) => {
    switch (step) {
        case 1:
            return stepGeneralSchema;
        case 2:
            return stepSocialMediaSchema;
        case 3:
            return stepTokenSupplySchema;
        default:
            return combinedSchema;
    }
};

const MultiStepForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [savedId, setSavedId] = useState<string | null>(null);
    const queryClient = useQueryClient();

    // keep combined type for TS stability
    const methods = useForm<CombinedFormType>({
        // resolver: zodResolver(combinedSchema), // static: for TS typing only
        defaultValues: {},
        mode: "onBlur",
    });

    const {
        handleSubmit,
        reset,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = methods;

    // helper: translate zod error to react-hook-form setError
    const setZodErrorsOnForm = (zodError?: z.ZodError) => {
        if (!zodError || !zodError.issues) return;

        // get field names from current schema
        const stepShape = getStepSchema(currentStep).shape;
        const stepKeys = Object.keys(stepShape);

        // clear only this step's errors
        clearErrors(stepKeys as any);

        // set errors that belong to this step
        zodError.issues.forEach((err) => {
            const path = err.path && err.path.length ? err.path.join(".") : "_root";
            const firstPathKey = String(err.path[0]); // <-- cast to string
            if (err.path.length && stepKeys.includes(firstPathKey)) {
                setError(path as any, { type: "manual", message: err.message });
            }
        });
    };




    // check current step validation (returns true if valid)
    const validateCurrentStep = (values: CombinedFormType) => {
        const schema = getStepSchema(currentStep);
        const result = schema.safeParse(values);
        if (!result.success) {
            setZodErrorsOnForm(result.error);
            return false;
        }
        // valid -> clear step-relevant errors
        clearErrors();
        return true;
    };

    // handle next/submit
    const handleNext = async (data: CombinedFormType) => {
        // 1) Validate only current step's schema
        const ok = validateCurrentStep(data);
        if (!ok) return;

        // 2️⃣ If NOT last step → just move forward (don’t call API)
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
            return;
        }
        // 2) Build FormData and POST (same logic you already used)
        const formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (typeof value === "object" && !(value instanceof File)) {
                    formDataToSend.append(key, JSON.stringify(value));
                } else {
                    formDataToSend.append(key, value as any);
                }
            }
        });

        if (savedId) formDataToSend.append("_id", savedId);

        try {
            const res = await fetch("/api/ico/add", {
                method: "POST",
                body: formDataToSend,
            });
            const result = await res.json();

            if (result.success) {
                setSavedId(result.data._id);
                if (currentStep < steps.length) {
                    setCurrentStep((prev) => prev + 1);
                } else {
                    await queryClient.invalidateQueries({
                        queryKey: ["ico-projects", ""],
                    });
                    router.push("/user/dashboard");
                }
            } else {
                console.error("Error saving:", result.error);
                alert("Error saving: " + result.error);
            }
        } catch (err) {
            console.error("Network/save error:", err);
            alert("Network error while saving data.");
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleClose = () => {
        reset();
        setCurrentStep(1);
    };

    // render step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepGeneral />;
            case 2:
                return <StepSocialMedia />;
            case 3:
                return <StepTokenSupply />;
            case 4:
                return <FaqSection />;
            case 5:
                return <StepVideoPresentation />;
            default:
                return null;
        }
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(handleNext)}
                className="flex flex-col md:flex-row gap-8 md:gap-0 rounded-2xl"
            >
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

                {/* Main Form Content */}
                <div className="flex-1 w-full bg-brand-glass/50 rounded-md p-6 md:p-8 mx-auto max-w-[1600px] relative">
                    {renderStep()}

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row justify-between mt-8 gap-4 md:gap-0">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-8 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted w-full md:w-auto cursor-pointer"
                            >
                                Back
                            </button>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-8 py-2 rounded-md text-sm font-medium bg-brand-glass text-brand-muted w-full sm:w-auto cursor-pointer"
                            >
                                Close
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-2 rounded-md text-sm font-medium bg-brand-yellow text-black w-full sm:w-auto cursor-pointer"
                            >
                                {currentStep === steps.length ? "Submit For Approval" : "Next Step"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default MultiStepForm;
