import { z } from "zod";

export const stepSocialMediaSchema = z.object({
  //   facebookLink: z.string().url("Enter a valid Facebook URL").optional(),
  linkedinLink: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .nonempty("LinkedIn link is required"),
  //   twitterLink: z.string().url("Enter a valid Twitter URL").optional(),
  githubLink: z
    .string()
    .url("Enter a valid GitHub URL")
    .nonempty("GitHub link is required"),
  //   telegramLink: z.string().url("Enter a valid Telegram URL").optional(),
  //   mediumLink: z.string().url("Enter a valid Medium URL").optional(),
  //   discordLink: z.string().url("Enter a valid Discord URL").optional(),
  //   youtubeLink: z.string().url("Enter a valid YouTube URL").optional(),
});
