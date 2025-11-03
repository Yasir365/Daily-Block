import { X } from "lucide-react";

const FaqCard = ({
  index,
  faq,
  onChange,
  onRemove,
  type = "edit",
}: {
  index: string;
  faq: any;
  onChange: (index: string, field: string, value: string) => void;
  onRemove: (index: string) => void;
  type?: "edit" | "read"; // 👈 optional type prop

}) => {
  return (
    <div className="w-full bg-[#0D0E1280] border border-[#21222C80] rounded-[12px] p-6 shadow-[0_1px_2px_0_#0000000D] relative flex flex-col gap-4">
      <X
        className="absolute top-1 right-2 w-5 h-5 cursor-pointer text-red-400"
        onClick={() => onRemove(index)}
      />
      <div className="flex flex-col gap-2 w-[95%]">
        <label className="font-semibold text-sm text-[#F8FAFC]">Question</label>

        {type === "edit" ? (
          <input
            type="text"
            value={faq.question || ""}
            onChange={(e) => onChange(index, "question", e.target.value)}
            placeholder="Enter question..."
            className="w-full bg-[#0D0E12] border border-[#21222C] rounded-[10px] px-3 py-2 text-white"
          />
        ) : (
          <p className="text-white bg-[#0D0E12] border border-[#21222C] rounded-[10px] px-3 py-2">
            {faq.question || "No question available"}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-[95%]">
        <label className="font-semibold text-sm text-[#F8FAFC]">Answer</label>
        {type === "edit" ? (
          <textarea
            value={faq.answer || ""}
            onChange={(e) => onChange(index, "answer", e.target.value)}
            placeholder="Enter answer..."
            className="w-full bg-[#0D0E12] border border-[#21222C] rounded-[10px] px-3 py-2 text-white resize-none"
          />
        ) : (
          <div className="relative">
            {/* Fixed height container with scroll */}
            <div
              className="text-white bg-[#0D0E12] border border-[#21222C] rounded-[10px] px-3 py-2 max-h-32 overflow-y-auto custom-scrollbar"
              dangerouslySetInnerHTML={{ __html: faq.answer || "<p>No answer available</p>" }}
            />

            {/* Optional "See more" button */}
            {/* {faq.answer && faq.answer.length > 200 && (
              <button
                className="absolute bottom-1 right-2 text-sm text-blue-400 hover:underline"
                onClick={() => alert("Implement expand logic here")}
              >
                See more
              </button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqCard;
