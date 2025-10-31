import mongoose, { Schema, Document, Query } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type: "blog" | "ico" | "comment" | "system" | "user";
  typeRef?: "Blog" | "IcoProject" | "User"; // which model to populate
  relatedId?: mongoose.Types.ObjectId;
  relatedData?: Record<string, any>; // snapshot of related object
  status?: "pending" | "success" | "error" | "info"; // notification status
  userId?: mongoose.Types.ObjectId;
  receiverId?: mongoose.Types.ObjectId;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["blog", "ico", "comment", "system", "user"],
    },

    // 👇 Dynamic reference to related model
    relatedId: { type: mongoose.Schema.Types.ObjectId, refPath: "typeRef" },
    typeRef: {
      type: String,
      enum: ["Blog", "IcoProject", "User"],
      required: false,
    },

    // 👇 Embedded snapshot of the related object
    relatedData: {
      type: Schema.Types.Mixed,
      default: {},
      required: false,
    },

    // 👇 Notification status (optional)
    status: {
      type: String,
      enum: ["pending", "success", "error", "info"],
      default: "info",
    },

    userId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,

    strict: false, // 👈 allow mixed/unexpected nested data like relatedData
  }
);

// ✅ Auto-expire old notifications after 30 days
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

// ✅ Auto-sort newest first
NotificationSchema.pre<Query<INotification[], INotification>>(
  /^find/,
  function (next) {
    (this as Query<INotification[], INotification>).sort({ createdAt: -1 });
    next();
  }
);

export default mongoose.models.NotificationModel ||
  mongoose.model<INotification>("NotificationModel", NotificationSchema);
