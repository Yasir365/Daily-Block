import mongoose, { Schema, Document, Query } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category?: string; // Optional grouping (e.g., "General", "Account", etc.)
  status: "active" | "inactive";
  order?: number; // Optional field for sorting FAQs
  userId?: mongoose.Types.ObjectId; // Optional: if only admin can create
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    order: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ Auto-filter soft-deleted FAQs
FaqSchema.pre<Query<IFaq[], IFaq>>(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

// ✅ Refresh schema if reloaded
delete mongoose.models.Faq;

export default mongoose.model<IFaq>("FaqModal", FaqSchema);
