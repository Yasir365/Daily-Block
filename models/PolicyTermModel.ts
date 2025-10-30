import mongoose, { Schema, Document } from "mongoose";

export interface IPolicyTerm extends Document {
  type: "privacy" | "terms";
  content: string;
  lastUpdatedBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  createdAt?: Date;
}

const PolicyTermSchema = new Schema<IPolicyTerm>(
  {
    type: {
      type: String,
      enum: ["privacy", "terms"],
      required: true,
      unique: true,
    },
    content: { type: String, required: true },
    lastUpdatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Avoid model overwrite error during hot reload
delete mongoose.models.PolicyTerm;
export default mongoose.model<IPolicyTerm>("PolicyTerm", PolicyTermSchema);
