"use client"
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../ui/Input";
import SelectField from "../ui/Select";
import Teextarea from "../ui/Textarea";



const tokenOptions: any[] = [
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "BNB", label: "Binance Coin (BNB)" },
];

const StepGeneral = () => {

    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext();

    // ✅ Handle file uploads via Controller
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setValue("icoIcon", file);
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="border-b border-[#FFFFFF26]/85 pb-2">
                <h2 className="text-xl md:text-2xl font-semibold text-white">General</h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Details listed into the General Group
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Controller
                    name="cryptoCoinName"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Crypto Coin Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long",
                        },
                    }}
                    render={({ field }) => (
                        <InputField
                            {...field} // 👈 keep this BEFORE custom props
                            label="Crypto Coin Name"
                            placeholder='E.g: "Bitcoin"'
                            required
                            error={errors.cryptoCoinName?.message as string} // 👈 AFTER spreading field
                        />
                    )}
                />
                <Controller
                    name="coinAbbreviation"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Crypto Coin Abbreviation is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long",
                        },
                    }}
                    render={({ field }) => (
                        <InputField
                            {...field} // 👈 keep this BEFORE custom props
                            label="Coin Abbreviation"
                            placeholder='E.g: "Bitcoin"'
                            required
                            error={errors.coinAbbreviation?.message as string} // 👈 AFTER spreading field
                        />
                    )}
                />



                {/* File Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-sm">ICO Icon</label>
                    <div className="bg-brand-glass flex items-center justify-end p-2 rounded-xl gap-3">
                        <input
                            type="file"
                            id="icoIcon"
                            placeholder="Select ico icon"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="icoIcon"
                            className="bg-brand-yellow text-black font-semibold px-4 py-2 rounded-md cursor-pointer "
                        >
                            Add or Upload File
                        </label>
                        {/* {data.icoIcon && (
                            <span className="text-sm text-gray-300">{data.icoIcon.name}</span>
                        )} */}
                    </div>
                </div>

                <Controller
                    name="icoTokenPrice"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="ICO Token Price"
                            placeholder="Enter Token Price (Eg: 4000 BTC)"
                            {...field}
                        />
                    )}
                />
            </div>

            <Controller
                name="additionalDetails"
                control={control}
                render={({ field }) => (
                    <Teextarea
                        label="Additional ICO Details"
                        placeholder="Enter detailed ICO description..."
                        rows={4}
                        {...field}
                    />
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Controller
                    name="kyc"
                    control={control}
                    render={({ field }) => (
                        <SelectField
                            btnClass="bg-brand-glass text-gray-800"
                            dropBg="bg-[#545454]"
                            label="Know Your Customer (KYC)"
                            options={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                            ]}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="kycDetails"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Know Your Customer (KYC)? Details"
                            placeholder="Enter KYC details..."
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="cantParticipate"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Can't participate"
                            placeholder="E.g: 'LTC, XRT ...'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="participationWith"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Participation with:"
                            placeholder="Following Cryptos: E.g: 'BTC, LTC, ETH'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="competitionCoins"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Competition Coins"
                            placeholder="List of Competition Coins. E.g: 'BTC, LTC ...'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="tokenRole1"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Token Role"
                            placeholder="Set Token Role E.g: 'UTILITY'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="tokenType"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Token Type"
                            placeholder="Set Token Type: E.g: 'ERC20'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="interest"
                    control={control}
                    render={({ field }) => (
                        <SelectField
                            btnClass="bg-brand-glass text-gray-800"
                            dropBg="bg-[#545454]"
                            label="Interest"
                            options={[
                                { value: "High", label: "High" },
                                { value: "Neutral", label: "Neutral" },
                                { value: "Low", label: "Low" },
                            ]}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="tokenRole2"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Token Role"
                            placeholder="Set Token Role E.g: 'UTILITY'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="received"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Received"
                            placeholder="Set the money received (Eg: 40000000 BTC)"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="icoStartDate"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            type="date"
                            label="ICO Start Date"
                            placeholder="Set the Start Date"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="icoEndDate"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            type="date"
                            label="ICO End Date"
                            placeholder="Set the End Date"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="websiteLink"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Website link"
                            placeholder="Your Coin Website URL. E.g: 'http://example.com'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="whitepaperLink"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Whitepaper link"
                            placeholder="WhitePaper URL. E.g: 'http://example.com/whitepaper.pdf'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="prototypeLink"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Prototype link"
                            placeholder="Your Prototype URL. E.g: 'http://example.com/'"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="coinPurchaseLink"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            label="Coin Purchase link"
                            placeholder="Your Coin Purchase URL. E.g: 'http://example.com/'"
                            {...field}
                        />
                    )}
                />
            </div>
        </div >
    );
};

export default StepGeneral;
