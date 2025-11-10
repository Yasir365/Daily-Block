import mongoose, { Schema, Document, models } from "mongoose";

export interface ICommunity extends Document {
  userId: mongoose.Types.ObjectId;
  name?: string;
  image?: string;
  icoProjects: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    icoProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "IcoProject",
      },
    ],
  },
  { timestamps: true }
);

export default models.Community ||
  mongoose.model<ICommunity>("Community", CommunitySchema);
