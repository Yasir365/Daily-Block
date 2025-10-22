import { X } from 'lucide-react'
import React from 'react'


const FaqCard = ({ handleInput, data }: { handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, data: any }) => {
    return (
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
                        className={`w-full max-w-[99%] h-[40px] bg-[#0D0E12] border border-[#21222C] rounded-[10px]
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
                        className="w-full  max-w-[99%] h-[100px] bg-[#0D0E12] border border-[#21222C] rounded-[10px]
                                        px-[12.8px] pt-[10.8px] pb-[10.8px] text-white placeholder-gray-400
                                        focus:outline-none focus:ring-1 focus:ring-brand-yellow resize-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default FaqCard