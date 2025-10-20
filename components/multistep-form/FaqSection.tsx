import { Plus, X } from "lucide-react";
import InputField from "../ui/Input";

interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const FaqSection: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);

    return (
        <div>
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-semibold text-white -mb-1">FAQ Items</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Add, edit, or remove coin listing FAQ items
                    </p>
                </div>
                <button
                    className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-brand-yellow text-[#3B3B3B] 
                        text-[14px] font-inter font-semibold leading-[20px] tracking-[0%] cursor-pointer"
                >
                    <Plus />
                    <span>Add FAQ</span>
                </button>

            </div>

            <div
                className="w-full h-[267px] bg-[#0D0E1280] border border-[#21222C80] rounded-[12px] p-6
                 shadow-[0_1px_2px_0_#0000000D] relative flex flex-col gap-4"
            >
                <div className="w-full flex flex-col gap-4 relative">
                    <X className="absolute top-1 right-2 w-5 h-5 cursor-pointer text-red-400" />
                    <div className="flex flex-col gap-1 relative w-[95%]">

                        <label
                            className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0%] align-middle text-[#F8FAFC] px-2 py-1 rounded"
                        >
                            Question 1
                        </label>
                        <input
                            id={"question-1"}
                            name={"question-1"}
                            placeholder={"How do I list my ICO project on DailyBlock?"}
                            value={data["question-1"] || ""}
                            onChange={handleInput}
                            className={`w-full max-w-[930px] h-[40px] bg-[#0D0E12] border border-[#21222C] rounded-[10px]
                   px-[12.8px] pt-[10.8px] pb-[10.8px] text-white placeholder-gray-400
                   focus:outline-none focus:ring-1 focus:ring-brand-yellow `}
                        />
                    </div>
                    <div className="flex flex-col gap-1  w-[95%]">

                        <label
                            className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0%] align-middle text-[#F8FAFC] px-2 py-1 rounded"
                        >
                            Answer
                        </label>
                        <textarea
                            id="answer-1"
                            name="answer-1"
                            placeholder="placeholder"
                            value={data["answer-1"] || ""}
                            onChange={handleInput}
                            className="w-full max-w-[930px] h-[100px] bg-[#0D0E12] border border-[#21222C] rounded-[10px]
                                        px-[12.8px] pt-[10.8px] pb-[10.8px] text-white placeholder-gray-400
                                        focus:outline-none focus:ring-1 focus:ring-brand-yellow resize-none"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FaqSection;
