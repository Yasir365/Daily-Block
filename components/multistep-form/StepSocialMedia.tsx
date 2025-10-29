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
          placeholder="Set Facebook link URL"
          value={data.facebookLink || ""}
          onChange={handleInput}
        />
        <InputField
          label="LinkedIn Link"
          name="linkedinLink"
          placeholder="Set LinkedIn link URL"
          value={data.linkedinLink || ""}
          onChange={handleInput}
          required
        />
        <InputField
          label="Twitter Link"
          name="twitterLink"
          placeholder="Set Twitter link URL"
          value={data.twitterLink || ""}
          onChange={handleInput}
        />
        <InputField
          label="Github Link"
          name="githubLink"
          placeholder="Set Github link URL"
          value={data.githubLink || ""}
          onChange={handleInput}
          required
        />
        <InputField
          label="Telegram Link"
          name="telegramLink"
          placeholder="Set Telegram link URL"
          value={data.telegramLink || ""}
          onChange={handleInput}
        />
        <InputField
          label="Medium Link"
          name="mediumLink"
          placeholder="Set Medium link URL"
          value={data.mediumLink || ""}
          onChange={handleInput}
        />
        <InputField
          label="Discord Link"
          name="discordLink"
          placeholder="Set Discord link URL"
          value={data.discordLink || ""}
          onChange={handleInput}
        />
        <InputField
          label="YouTube Link"
          name="youtubeLink"
          placeholder="Set YouTube link URL"
          value={data.youtubeLink || ""}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default StepSocialMedia;
