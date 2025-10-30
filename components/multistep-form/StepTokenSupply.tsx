"use client";

import { useFormContext, Controller } from "react-hook-form";
import InputField from "../ui/Input";
import { stepTokenSupplySchema } from "@/schemas/tokenSupplySchema";

const StepTokenSupply = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-2">Token Supply</h2>
            <p className="text-gray-400 text-sm mb-6">
                Details listed into the Token Supply Group
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                    { label: "Fundraising goal", name: "fundraisingGoal", placeholder: "Enter Fundraising Goal (Eg: 20000000 BTC)" },
                    { label: "Sold on pre-sale", name: "soldOnPreSale", placeholder: "Enter Sold on pre-sale (Eg: 40000000 BTC)" },
                    { label: "Total Supply", name: "totalSupply", placeholder: "Enter Total Number of Tokens (Eg: 40000000 BTC)" },
                    { label: "Circulating Supply", name: "circulatingSupply", placeholder: "Enter Available for Token Sale (Eg: 35000000 BTC)" },
                    { label: "Team Tokens", name: "teamTokens", placeholder: "Enter Available Tokens kept for the team (Eg: 5000000 BTC)" },
                    { label: "Other Tokens", name: "otherTokens", placeholder: "Enter Available Tokens kept for reasons (Eg: 2000000 BTC)" },
                ].map((field) => (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputField
                                label={field.label}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={value || ""}
                                onChange={(e) => onChange(e.target.value)}
                                error={errors[field.name]?.message as string} // display error message
                            />
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepTokenSupply;
