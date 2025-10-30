import { Plus, X } from "lucide-react";
import FaqCard from "../ui/FaqCard";
import { useFieldArray, useFormContext } from "react-hook-form";


const FaqSection = () => {
  const { control } = useFormContext();

  // useFieldArray to manage the dynamic FAQs
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "faqs", // this key will be used in the form state
  });

  const handleAddFaq = () => {
    append({ question: "", answer: "" });
  };
  const handleUpdateFaq = (index: string, field: string, value: string) => {
    const idx = Number(index); // ✅ convert to number first
    if (isNaN(idx)) return; // ✅ safety check

    update(idx, { ...fields[idx], [field]: value });
  };

  const handleRemoveFaq = (index: string) => {
    const idx = Number(index); // ✅ convert to number first
    if (isNaN(idx)) return; // ✅ safety check

    remove(idx);
  };



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
          onClick={handleAddFaq}
          type="button"
          className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-brand-yellow text-[#3B3B3B] 
            text-[14px] font-inter font-semibold leading-[20px] tracking-[0%] cursor-pointer"
        >
          <Plus />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((faq: any, index: number) => (
          <FaqCard
            key={index}
            index={index + ""}
            faq={faq}
            onChange={handleUpdateFaq}
            onRemove={handleRemoveFaq}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
