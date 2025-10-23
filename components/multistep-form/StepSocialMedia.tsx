import { Facebook, Linkedin, Twitter, Github, Youtube, Send } from "lucide-react";
import InputField from "../ui/Input";

interface Props {
    data: any;
    onChange: (name: string, value: any) => void;
}

const StepSocialMedia: React.FC<Props> = ({ data, onChange }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.name, e.target.value);

    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-2">Social Media</h2>
            <p className="text-gray-400 text-sm mb-6">
                Details listed into the Social Media Group
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputField
                    label="Facebook Link"
                    name="facebookLink"
                    placeholder='Set Facebook link url'
                    value={data.cryptoCoinName || ""}
                    onChange={handleInput}
                    icon={<img src="/svg/social/round_fb.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    required
                />
                <InputField
                    label="LinkedIn Link"
                    name="linkedinLink"
                    placeholder='Set Linkedin link url'
                    value={data.coinAbbreviation || ""}
                    onChange={handleInput}
                    icon={<img src="/svg/social/insta.svg" alt="Facebook" className="w-4 h-4" />}
                    iconPlace="right"
                    required
                />
                <InputField
                    label="Twitter Link"
                    name="twitterLink"
                    placeholder='Set Twitter link url'
                    value={data.coinAbbreviation || ""}
                    onChange={handleInput}
                    icon={<img src="/svg/social/x.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    required
                />
                <InputField
                    label="Github Link"
                    name="githubLink"
                    placeholder='Set Github link url'
                    value={data.coinAbbreviation || ""}
                    icon={<img src="/svg/social/git.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    onChange={handleInput}
                    required
                />
                <InputField
                    label="Telegram Link"
                    name="telegramLink"
                    placeholder='Set Telegram link url'
                    icon={<img src="/svg/social/telegram.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    value={data.coinAbbreviation || ""}
                    onChange={handleInput}
                    required
                />
                <InputField
                    label="Medium Link"
                    name="mediumLink"
                    placeholder='Set Medium link url'
                    value={data.coinAbbreviation || ""}
                    icon={<img src="/svg/social/medium.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    onChange={handleInput}
                    required
                />
                <InputField
                    label="Bitcoin Link"
                    name="bitcoinLink"
                    placeholder='Set Bitcoin link url'
                    value={data.coinAbbreviation || ""}
                    icon={<img src="/svg/social/bitcoin.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    onChange={handleInput}
                    required
                />
                <InputField
                    label="YouTube Link"
                    name="youtubeLink"
                    placeholder='Set YouTube link url'
                    icon={<img src="/svg/social/youtube.svg" alt="Facebook" className="w-5 h-5" />}
                    iconPlace="right"
                    value={data.coinAbbreviation || ""}
                    onChange={handleInput}
                    required
                />
            </div>
        </div>
    );
};

export default StepSocialMedia;
