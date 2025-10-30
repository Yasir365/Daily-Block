// schemas/faqSchema.ts
import { z } from "zod";

export const faqSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

export type FaqType = z.infer<typeof faqSchema>;
