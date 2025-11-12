import { z } from "zod";
import { stepSocialMediaSchema } from "./socialMediaSchema";

// 🔹 Zod Schema for Step 1
export const stepGeneralSchema = z.object({
  cryptoCoinName: z.string().min(3, "Crypto Coin Name is required"),
  coinAbbreviation: z.string().min(3, "Coin Abbreviation is required"),
  icoIcon: z.any().optional(),
  icoImages: z.any().optional(),
  icoTokenPrice: z.string().optional(),
  additionalDetails: z.string().optional(),
  kyc: z.string().optional(),
  kycDetails: z.string().optional(),
  cantParticipate: z.string().optional(),
  participationWith: z.string().optional(),
  competitionCoins: z.string().optional(),
  tokenRole1: z.string().optional(),
  tokenType: z.string().optional(),
  interest: z.string().optional(),
  tokenRole2: z.string().optional(),
  received: z.string().optional(),
  icoStartDate: z.string().optional(),
  icoEndDate: z.string().optional(),
  websiteLink: z.string().url("Enter a valid URL").optional(),
  whitepaperLink: z.string().url("Enter a valid URL").optional(),
  prototypeLink: z.string().url("Enter a valid URL").optional(),
  coinPurchaseLink: z.string().url("Enter a valid URL").optional(),
});
export const combinedSchema = stepGeneralSchema.merge(stepSocialMediaSchema);

export type CombinedFormType = z.infer<typeof combinedSchema>;
