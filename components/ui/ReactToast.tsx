import { X } from "lucide-react";
import toast from "react-hot-toast";

export const CustomToast = ({ message, status, t }: { message: string, status?: string; t: any }) => {
    // Define dynamic colors based on status
    const getStatusColor = () => {
        switch (status?.toLowerCase()) {
            case "error":
                return "text-[#ef4444]"; // red-500
            case "warn":
            case "warning":
                return "text-[#facc15]"; // yellow-400
            default:
                return "text-[#22c55e]"; // green-500 (success)
        }
    };

    return (
        <div
            className={`relative w-[388px] h-[132px] p-6 rounded-l-[12px] border border-[#364349]
                shadow-[0_1px_2px_0_#0000000D]
                bg-gradient-to-br from-[#121212] to-[#141B1F]
                backdrop-blur-[4px] flex flex-col justify-center
                font-inter text-[#F8FAFC] transition-all duration-300
                ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
            {/* X Button */}
            <button
                onClick={() => toast.dismiss(t.id)}
                className="absolute top-5 right-5 text-white hover:text-[#F8FAFC] transition cursor-pointer"
            >
                <X size={16} />
            </button>

            {/* Text Content */}
            <div className="flex flex-col gap-2 pt-4">
                <span
                    className={`block text-[14px] leading-[20px] font-semibold ${getStatusColor()}`}
                >
                    {status
                        ? status.charAt(0).toUpperCase() + status.slice(1)
                        : "Success"}
                </span>
                <span className="block text-[14px] leading-[20px] font-normal text-[#F8FAFC]/90 mt-1">
                    {message}
                </span>
            </div>
        </div>
    )
};

