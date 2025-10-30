// models/Message.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IMessage extends Document {
  icoId: mongoose.Types.ObjectId; // Reference to ICO Project
  senderId: mongoose.Types.ObjectId; // User or Admin ID
  receiverId?: mongoose.Types.ObjectId; // Optional (mainly if needed)
  senderRole: "admin" | "user"; // Identify who sent the message
  message: string;
  isRead: boolean; // ✅ NEW FIELD
  readAt?: Date; // ✅ NEW FIELD
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    icoId: {
      type: Schema.Types.ObjectId,
      ref: "IcoProject",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderRole: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false, // all new messages start unread
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
