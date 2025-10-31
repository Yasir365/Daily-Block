// src/models/NewsletterModel.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface INewsletter {
  email: string;
  status: "active" | "blocked";
  createdAt: Date;
}

const newsletterSchema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

const Newsletter =
  models.Newsletter || model<INewsletter>("Newsletter", newsletterSchema);
export default Newsletter;
