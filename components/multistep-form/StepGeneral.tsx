import InputField from "../ui/Input";
import SelectField from "../ui/Select";
import Teextarea from "../ui/Textarea";


interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const tokenOptions: any[] = [
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "BNB", label: "Binance Coin (BNB)" },
];

const StepGeneral: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);

    // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    //     onChange(e.target.name, e.target.value);
    const handleSelect = (value: string, name: string) => {
        onChange(name, value);
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange("icoIcon", file);
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
                <InputField
                    label="Crypto Coin Name"
                    name="cryptoCoinName"
                    placeholder='E.g: "Bitcoin"'
                    value={data.cryptoCoinName || ""}
                    onChange={handleInput}
                    required
                />
                <InputField
                    label="Coin Abbreviation"
                    name="coinAbbreviation"
                    placeholder='E.g: "BTC"'
                    value={data.coinAbbreviation || ""}
                    onChange={handleInput}
                    required
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
                            onChange={handleFile}
                            className="hidden"
                        />
                        <label
                            htmlFor="icoIcon"
                            className="bg-brand-yellow text-black font-semibold px-4 py-2 rounded-md cursor-pointer "
                        >
                            Add or Upload File
                        </label>
                        {data.icoIcon && (
                            <span className="text-sm text-gray-300">{data.icoIcon.name}</span>
                        )}
                    </div>
                </div>

                <InputField
                    label="ICO Token Price"
                    name="icoTokenPrice"
                    placeholder="Enter Token Price (Eg: 4000 BTC)"
                    value={data.icoTokenPrice || ""}
                    onChange={handleInput}
                />
            </div>

            <Teextarea
                label="Additional ICO Details"
                name="additionalDetails"
                placeholder="Enter detailed ICO description..."
                value={data.additionalDetails || ""}
                onChange={handleInput}
                rows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <SelectField
                    btnClass="bg-brand-glass text-gray-800"
                    dropBg="bg-[#545454] "
                    label="Know Your Customer (KYC)"
                    name="kyc"
                    options={tokenOptions}
                    value={data.kyc || "Yes"}
                    // onChange={handleSelect}
                    onChange={(value) => handleSelect(value, "kyc")}  // ✅ Correct: `value` is a string

                />
                <InputField
                    label="Know Your Customer (KYC)? Details"
                    name="kycDetails"
                    placeholder="Enter KYC details..."
                    value={data.kycDetails || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Can't participate"
                    name="cantParticipate"
                    placeholder="E.g: 'LTC, XRT ...'"
                    value={data.cantParticipate || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Participation with:"
                    name="participationWith"
                    placeholder="Following Cryptos: E.g: 'BTC, LTC, ETH'"
                    value={data.participationWith || ""}
                    onChange={handleInput}
                />

                <InputField
                    label="Competition Coins"
                    name="competitionCoins"
                    placeholder="List of Competition Coins. E.g: 'BTC, LTC ...'"
                    value={data.competitionCoins || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Token Role"
                    name="tokenRole1"
                    placeholder="Set Token Role E.g: 'UTILITY'"
                    value={data.tokenRole1 || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Token Type"
                    name="tokenType"
                    placeholder="Set Token Type: E.g: 'ERC20'"
                    value={data.tokenType || ""}
                    onChange={handleInput}
                />
                <SelectField
                    btnClass="bg-brand-glass text-gray-800"
                    dropBg="bg-[#545454] "
                    label="Interest"
                    name="interest"
                    options={tokenOptions}
                    placeholder="Select Interest Level"
                    value={data.interest || "Neutral"}
                    // onChange={handleSelect}
                    onChange={(value) => handleSelect(value, "interest")}  // ✅ Correct: `value` is a string

                />
                <InputField
                    label="Token Role"
                    name="tokenRole2"
                    placeholder="Set Token Role E.g: 'UTILITY'"
                    value={data.tokenRole2 || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Received"
                    name="received"
                    placeholder="Set the money received (Eg: 40000000 BTC)"
                    value={data.received || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="ICO Start Date"
                    name="icoStartDate"
                    placeholder="Set the Start Date"
                    type="date"
                    value={data.icoStartDate || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="ICO End Date"
                    name="icoEndDate"
                    placeholder="Set the End Date"
                    type="date"
                    value={data.icoEndDate || ""}
                    onChange={handleInput}
                />

                <InputField
                    label="Website link"
                    name="websiteLink"
                    placeholder="Your Coin Websit url. E.g: 'http://example.com'"
                    value={data.websiteLink || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Whitepapper link"
                    name="whitepaperLink"
                    placeholder="WhitePaper url. E.g: 'http://example.com/whitepaper.pdf'"
                    value={data.whitepaperLink || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Prototype link"
                    name="prototypeLink"
                    placeholder="Your Prototype url. E.g: 'http://example.com/'"
                    value={data.prototypeLink || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Coin Purchase link"
                    name="coinPurchaseLink"
                    placeholder="Your Coin Purchase Url. E.g: 'http://example.com/'"
                    value={data.coinPurchaseLink || ""}
                    onChange={handleInput}
                />
            </div>
        </div >
    );
};

export default StepGeneral;
