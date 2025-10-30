"use client";

import { Controller, useFormContext } from "react-hook-form";
import InputField from "../ui/Input";

const StepSocialMedia = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">Social Media</h2>
      <p className="text-gray-400 text-sm mb-6">
        Details listed into the Social Media Group
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Facebook Link */}
        <Controller
          name="facebookLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Facebook Link"
              placeholder="Set Facebook link URL"
              error={errors.facebookLink?.message as string}
            />
          )}
        />

        {/* LinkedIn Link */}
        <Controller
          name="linkedinLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="LinkedIn Link"
              placeholder="Set LinkedIn link URL"
              required
              error={errors.linkedinLink?.message as string}
            />
          )}
        />

        {/* Twitter Link */}
        <Controller
          name="twitterLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Twitter Link"
              placeholder="Set Twitter link URL"
              error={errors.twitterLink?.message as string}
            />
          )}
        />

        {/* Github Link */}
        <Controller
          name="githubLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Github Link"
              placeholder="Set Github link URL"
              required
              error={errors.githubLink?.message as string}
            />
          )}
        />

        {/* Telegram Link */}
        <Controller
          name="telegramLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Telegram Link"
              placeholder="Set Telegram link URL"
              error={errors.telegramLink?.message as string}
            />
          )}
        />

        {/* Medium Link */}
        <Controller
          name="mediumLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Medium Link"
              placeholder="Set Medium link URL"
              error={errors.mediumLink?.message as string}
            />
          )}
        />

        {/* Discord Link */}
        <Controller
          name="discordLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="Discord Link"
              placeholder="Set Discord link URL"
              error={errors.discordLink?.message as string}
            />
          )}
        />

        {/* YouTube Link */}
        <Controller
          name="youtubeLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              {...field}
              label="YouTube Link"
              placeholder="Set YouTube link URL"
              error={errors.youtubeLink?.message as string}
            />
          )}
        />
      </div>
    </div>
  );
};

export default StepSocialMedia;
