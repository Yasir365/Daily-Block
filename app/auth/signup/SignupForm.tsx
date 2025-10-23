"use client";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { ChevronDown, Eye, EyeOff, Mail } from "lucide-react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import toast from "react-hot-toast";
import { CustomToast } from "@/components/ui/ReactToast";
import { useState } from "react";
import InputField from "@/components/ui/Input";
import SelectField from "@/components/ui/Select";

export const SignupForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState("");

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        terms: false,
        marketing: false,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleUserTypeChange = (value: string) => {
        setFormData(prev => ({ ...prev, userType: value }));
    };
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message={"Account created successfully!"}
            />
        ));
        router.push("/auth/login");
    };
    const userOptions = [
        { value: "user1", label: "User 1" },
        { value: "user2", label: "User 2" },
    ];
    return (
        <form className="space-y-6" onSubmit={submitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    lblCls="text-sm font-medium text-brand-muted"
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}

                    inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    lblCls="text-sm font-medium text-brand-muted"
                />
            </div>

            {/* Email Address & User Type (Row 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10"
                    lblCls="text-sm font-medium text-brand-muted"
                    icon={<Mail size={20} />}
                    iconPlace="right"
                />
                <SelectField
                    label="User Type"
                    name="userType"
                    value={formData.userType}
                    onChange={handleUserTypeChange}
                    options={userOptions}
                    placeholder="Select User Type"
                    required
                    className="mt-2"
                    btnClass="bg-brand-glass border border-gray-600"
                    dropBg="backdrop-blur-md p-2 bg-[linear-gradient(160.73deg,#121212_0%,#141B1F_100%)]"
                    lblClass="text-sm font-medium text-brand-muted"
                />
            </div>

            {/* Password & Confirm Password (Row 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10"
                    lblCls="text-sm font-medium text-brand-muted"
                    icon={showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    iconPlace="right"
                    onIconClick={togglePassword}
                />
                <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    inputClass="w-full p-3 mt-2 bg-brand-glass border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow pr-10"
                    lblCls="text-sm font-medium text-brand-muted"
                    icon={showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    iconPlace="right"
                    onIconClick={toggleConfirmPassword}
                />
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <p className="text-brand-muted">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                <div className="flex gap-2">
                    <input type="checkbox" id="keep-logged-in" className="h-4 w-4 rounded  bg-brand-glass border-gray-600 
             text-brand-yellow accent-brand-yellow 
             focus:ring-brand-yellow focus:ring-offset-0" />
                    <label htmlFor="keep-logged-in" className="text-brand-muted">By creating an account, I agree to our Terms of use and Privacy Policy </label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="keep-logged-in" className="h-4 w-4 rounded  bg-brand-glass border-gray-600 
             text-brand-yellow accent-brand-yellow 
             focus:ring-brand-yellow focus:ring-offset-0" />
                    <label htmlFor="keep-logged-in" className="text-brand-muted w-100 w-lg-75">By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions. </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                <button type="submit" className="w-full py-3 font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-400 transition-colors" >
                    Sign Up
                </button>

                <p className="w-full text-center text-sm text-brand-muted flex items-center justify-center">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-medium text-brand-yellow hover:underline ml-1">
                        Log in
                    </Link>
                </p>
            </div>


            <div className="flex items-center gap-4">
                <hr className="w-full border-gray-600" />
                <span className="text-brand-muted">OR</span>
                <hr className="w-full border-gray-600" />
            </div>

            <SocialLoginButtons />


        </form>
    )
}