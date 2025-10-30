"use client";

import { useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
import InputField from "@/components/ui/Input";

export interface FaqItem {
    question: string;
    answer: string; _id?: string;

}

const FaqSectionSingle = ({ onSave }: { onSave?: (faq: FaqItem) => void }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FaqItem>({
        defaultValues: {
            question: "",
            answer: "",
        },
    });

    const onSubmit = (data: FaqItem) => {
        if (onSave) onSave(data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
        >
            <div>
                <h2 className="text-xl font-semibold text-white -mb-1">FAQ Item</h2>
                <p className="text-gray-400 text-sm mb-4">
                    Add a new question and answer for your FAQ list.
                </p>
            </div>

            {/* ✅ Question Field */}
            <Controller
                name="question"
                control={control}
                defaultValue=""
                rules={{
                    required: "Question is required",
                    minLength: {
                        value: 5,
                        message: "Question must be at least 5 characters long",
                    },
                }}
                render={({ field }) => (
                    <InputField
                        {...field} // 👈 Spread field props first
                        label="Question"
                        placeholder="Enter FAQ question"
                        required
                        error={errors.question?.message as string}
                    />
                )}
            />

            {/* ✅ Answer Field */}
            <Controller
                name="answer"
                control={control}
                defaultValue=""
                rules={{
                    required: "Answer is required",
                    minLength: {
                        value: 10,
                        message: "Answer must be at least 10 characters long",
                    },
                }}
                render={({ field }) => (
                    <InputField
                        {...field}
                        label="Answer"
                        placeholder="Enter FAQ answer"
                        required
                        error={errors.answer?.message as string}
                    />
                )}
            />

            {/* ✅ Submit Button */}
            <button
                type="submit"
                className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-brand-yellow text-[#3B3B3B]
          text-[14px] font-inter font-semibold leading-[20px] tracking-[0%] cursor-pointer hover:bg-yellow-400 transition"
            >
                <Plus />
                <span>Save FAQ</span>
            </button>
        </form>
    );
};

export default FaqSectionSingle;
