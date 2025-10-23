import { Plus, X } from "lucide-react";
import InputField from "../ui/Input";
import FaqCard from "../ui/FaqCard";

interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const FaqSection: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);

    return (
        <div className="flex flex-col gap-4 md:gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Title Section */}
                <div>
                    <h2 className="text-xl font-semibold text-white -mb-1">FAQ Items</h2>
                    <p className="text-gray-400 text-sm mb-2 sm:mb-6">
                        Add, edit, or remove coin listing FAQ items
                    </p>
                </div>

                {/* Add FAQ Button */}
                <button
                    className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg 
                 bg-brand-yellow text-[#3B3B3B] text-[14px] font-inter font-semibold 
                 leading-[20px] tracking-[0%] cursor-pointer w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
                </button>
            </div>

            <FaqCard handleInput={handleInput} data={data} />
        </div>

    );
}

export default FaqSection;
