import mongoose, { Schema, Document } from "mongoose";

export interface IVerificationCode extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

const VerificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

delete mongoose.models.VerificationCode;

export default mongoose.model<IVerificationCode>(
  "VerificationCode",
  VerificationCodeSchema
);
