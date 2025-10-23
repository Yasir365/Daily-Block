import { CustomToast } from "@/components/ui/ReactToast";
import { MoveUpRight } from "lucide-react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ForgetForm = () => {
    const router = useRouter();

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message="Code sent successfully!"
            />
        ));
        router.push("/auth/verify-otp");
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                Send Verification Code
                <MoveUpRight className="w-4 h-4" />
            </button>
        </form>
    )
}