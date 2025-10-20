import { Plus } from "lucide-react";
import InputField from "../ui/Input";

interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const StepVideoPresentation: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);

    return (
        <div>
            <div className="absolute top-5 right-5">
                <span className="flex gap-1 text-[14px] font-inter font-bold leading-[18px] items-center cursor-pointer">
                    <Plus />
                    <span className="text-brand-yellow">Add New</span>
                </span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Video Presentation</h2>
            <p className="text-gray-400 text-sm mb-6">
                Details listed into the Video Presentation Group
            </p>

            <div className="grid grid-cols-1   gap-4 md:gap-6">
                <InputField
                    label="Video tour"
                    name="videoTour"
                    placeholder="Enter a YouTube link which contains the presentation of your coin"
                    value={data.fundraisingGoal || ""}
                    onChange={handleInput}
                />
            </div>

            <p className="text-sm text-white mt-4">No oEmbed Results Found for http://1. View more info at codex.wordpress.org/Embeds.</p>
        </div>
    );
}

export default StepVideoPresentation;
