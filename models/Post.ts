import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // users who liked this comment
    replies: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // replies won't generate separate ObjectId
);

const PostSchema = new Schema(
  {
    coin: { type: Schema.Types.ObjectId, ref: "IcoProject", required: true },

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    title: String,
    content: String,
    images: [{ type: String }],

    // 👍 Users who liked this post
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // 🔁 Repost feature (like retweet)
    reposts: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // 📤 Shares — can track how many times shared or by whom
    shares: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        sharedAt: { type: Date, default: Date.now },
      },
    ],

    // 💬 Comments with nested replies
    comments: [CommentSchema],

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// 👇 Prevent duplicate model definitions in Next.js hot reload
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
