import mongoose, { Schema, Document, Query } from "mongoose";

export interface IUser extends Document {
  // 🖼️ Profile Image
  image?: string; // ✅ can store image URL (e.g. from Cloudinary or /uploads)
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  phone?: string;
  status: "active" | "inactive" | "banned" | "suspended";
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date; // ✅ Add this field
  // 🏠 Address fields
  streetAddress?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;

  // 🌐 Social links
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
  website?: string;

  // 🏘️ Community flag
  hasCommunity: boolean;
}
const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "user" },
    phone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "inactive", "banned", "suspended"],
      default: "suspended",
    },
    // 🖼️ Image

    image: { type: String, default: "" },

    // 🏠 Address Info (optional)
    streetAddress: { type: String, default: "" },
    apartment: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    country: { type: String, default: "" },

    // 🌐 Social Links (optional)
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    telegram: { type: String, default: "" },
    website: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    // 👇 Added soft delete fields
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    lastLogin: { type: Date, default: null }, // ✅ Store last login

    // 🏘️ Added community flag
    hasCommunity: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// ✅ Automatically filter out soft-deleted users from all find queries
UserSchema.pre<Query<IUser[], IUser>>(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

// 🧠 this line ensures the schema refreshes even after reloads:
delete mongoose.models.User;

export default mongoose.model<IUser>("User", UserSchema);
