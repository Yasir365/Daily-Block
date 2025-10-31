import mongoose, { Schema, Document, Query } from "mongoose";

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived" | "blocked" | "live";
  publishedDate?: Date;
  views: number;
  image?: string; // ✅ New field for uploaded image path

  likes: number;
  comments: Array<{
    userId: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
  }>;
  userId: mongoose.Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  readTime?: number;
}

// export interface IComment extends Document {
//   userId: { type: Schema.Types.ObjectId; ref: "User"; required: true };
//   comment: { type: String; required: true };
//   createdAt: { type: Date; default: Date.now };
// }

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    readTime: { type: Number, default: 0 }, // ✅ new field (in minutes)
    image: { type: String, default: null }, // ✅ image path (e.g. "/uploads/blogs/xyz.jpg")

    status: {
      type: String,
      enum: ["draft", "published", "archived", "blocked", "live"],
      default: "draft",
    },
    publishedDate: { type: Date, default: null },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ Auto-calculate readTime (average reading speed: 200 words/min)
BlogSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const words = this.content?.split(/\s+/).length || 0;
    this.readTime = Math.ceil(words / 200);
  }
  next();
});
// Automatically filter out soft-deleted blogs from all find queries
BlogSchema.pre<Query<IBlog[], IBlog>>(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

// Ensure schema refreshes even after reloads
delete mongoose.models.Blog;

export default mongoose.model<IBlog>("Blog", BlogSchema);
