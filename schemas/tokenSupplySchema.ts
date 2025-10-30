// schemas/tokenSupplySchema.ts
import { z } from "zod";

export const stepTokenSupplySchema = z.object({
  //   fundraisingGoal: z.string().min(1, "Fundraising goal is required"),
  //   soldOnPreSale: z.string().min(1, "Sold on pre-sale is required"),
  //   totalSupply: z.string().min(1, "Total supply is required"),
  //   circulatingSupply: z.string().min(1, "Circulating supply is required"),
  //   teamTokens: z.string().min(1, "Team tokens are required"),
  //   otherTokens: z.string().min(1, "Other tokens are required"),
});

export type StepTokenSupplyType = z.infer<typeof stepTokenSupplySchema>;
