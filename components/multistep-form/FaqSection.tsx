import { Plus, X } from "lucide-react";
import InputField from "../ui/Input";
import FaqCard from "../ui/FaqCard";

interface Props {
  data: any;
  onChange: (name: string, value: any) => void;
}

const FaqSection: React.FC<Props> = ({ data, onChange }) => {
  const faqs = data.faqs || [];

  const handleAddFaq = () => {
    const newFaqs = [...faqs, { question: "", answer: "" }];
    onChange("faqs", newFaqs);
  };

  const handleUpdateFaq = (index: number, field: string, value: string) => {
    const updatedFaqs = faqs.map((faq: any, i: number) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    onChange("faqs", updatedFaqs);
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_: any, i: number) => i !== index);
    onChange("faqs", updatedFaqs);
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
        {faqs.map((faq: any, index: number) => (
          <FaqCard
            key={index}
            index={index}
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
