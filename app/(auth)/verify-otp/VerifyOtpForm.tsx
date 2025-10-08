import { Input } from "antd";
import { MoveUpRight } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const VerifyOtpForm = () => {
    const router = useRouter();

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Code verified successfully!");
        router.push("/reset-password");
    };

    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-muted">Code</label>
                {/* <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                /> */}
                <div className="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl flex justify-center">
                    <Input.OTP length={5} formatter={(str) => str.toUpperCase()} className="flex justify-center" />

                </div>
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                Verify Code
                <MoveUpRight className="w-4 h-4" />
            </button>

            <p className="text-brand-muted text-center text-sm">
                Wrong Mail
                <Link href="/forgot-password" className="text-white ml-1">Send to different email</Link>
            </p>
        </form>
    )
}