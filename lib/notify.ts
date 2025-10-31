import mongoose from "mongoose";
import Notification from "@/models/NotificationModel";

/**
 * Universal function to create notifications for any type (Blog, ICO, User, etc.)
 */
export async function createNotification({
  title,
  message,
  type,
  related,
  userId,
  receiverId,
  status = "info",
}: {
  title: string;
  message: string;
  type: "blog" | "ico" | "user" | "system" | "comment";
  related?: any; // full object (e.g., blog or ICO)
  userId?: mongoose.Types.ObjectId | string;
  receiverId?: mongoose.Types.ObjectId | string;
  status?: "pending" | "success" | "error" | "info";
}) {
  try {
    // Map `type` to model name for population
    const modelMap: Record<string, string> = {
      blog: "Blog",
      ico: "IcoProject",
      user: "User",
      comment: "Comment",
      system: "User", // or another model if you have System notifications
    };

    const typeRef = modelMap[type];
    if (!typeRef) throw new Error(`Unknown type "${type}"`);

    // Determine the relatedId (if available)
    const relatedId =
      related?._id instanceof mongoose.Types.ObjectId
        ? related._id
        : related?._id
        ? new mongoose.Types.ObjectId(related._id)
        : undefined;
    console.log({ related });
    // Build related snapshot data (safe to keep lightweight)
    const relatedData =
      type === "blog"
        ? {
            title: related?.title,
            excerpt: related?.excerpt,
            image: related?.image,
            status: related?.status,
            readTime: related?.readTime,
            publishedDate: related?.publishedDate,
          }
        : type === "ico"
        ? {
            name: related?.cryptoCoinName,
            status: related?.status,
            tokenSymbol: related?.tokenSymbol,
            icoEndDate: related?.icoEndDate,
            price: related?.price,
          }
        : related
        ? { ...related }
        : {};
    console.log("🧩 Final Object Sent:", {
      title,
      message,
      type,
      typeRef,
      relatedId,
      relatedData: JSON.parse(JSON.stringify(relatedData)),
      status,
      userId,
      receiverId,
    });

    // ✅ Create the notification
    const created = await Notification.create({
      title,
      message,
      type,
      typeRef,
      relatedId,
      relatedData: JSON.parse(JSON.stringify(relatedData)),
      status,
      userId,
      receiverId,
    });

    console.log("✅ Saved Doc:", created);

    console.log(`✅ Notification created for type: ${type}`);
  } catch (err) {
    console.error("❌ Failed to create notification:", err);
  }
}
