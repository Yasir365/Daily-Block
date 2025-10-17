import InputField from "../ui/Input";

interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const StepTokenSupply: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-2">Token Supply</h2>
            <p className="text-gray-400 text-sm mb-6">
                Details listed into the Token Supply Group
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputField
                    label="Fundraising goal"
                    name="fundraisingGoal"
                    placeholder="Enter Fundraising Goal (Eg: 20000000 BTC)"
                    value={data.fundraisingGoal || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Sold on pre-sale"
                    name="soldOnPreSale"
                    placeholder="Enter Sold on pre-sale (Eg: 40000000 BTC)"
                    value={data.soldOnPreSale || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Total Supply"
                    name="totalSupply"
                    placeholder="Enter Total Number of Tokens (Eg: 40000000 BTC)"
                    value={data.totalSupply || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Circulating Supply"
                    name="circulatingSupply"
                    placeholder="Enter Available for Token Sale (Eg: 35000000 BTC)"
                    value={data.circulatingSupply || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Team Tokens"
                    name="teamTokens"
                    placeholder="Enter Available Tokens kept for the team (Eg: 5000000 BTC)"
                    value={data.teamTokens || ""}
                    onChange={handleInput}
                />
                <InputField
                    label="Other Tokens"
                    name="otherTokens"
                    placeholder="Enter Available Tokens kept for reasons (Eg: 2000000 BTC)"
                    value={data.otherTokens || ""}
                    onChange={handleInput}
                />
            </div>
        </div>
    );
}

export default StepTokenSupply;
