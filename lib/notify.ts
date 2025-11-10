import NotificationModel from "@/models/NotificationModel";
import User from "@/models/UserModel";
import mongoose from "mongoose";

export interface CreateNotificationParams {
  title: string;
  message: string;
  type: "blog" | "ico" | "comment" | "system" | "user";
  relatedId?: mongoose.Types.ObjectId;
  typeRef?: "Blog" | "IcoProject" | "User";
  relatedData?: Record<string, any>;
  userId?: mongoose.Types.ObjectId;
  receiverIds?: mongoose.Types.ObjectId[];
  status?: "pending" | "success" | "error" | "info";
  forAdmin?: boolean;
}

/**
 * Create one or multiple notifications
 */
export async function createNotification({
  title,
  message,
  type,
  relatedId,
  typeRef,
  relatedData,
  userId,
  receiverIds = [],
  status = "info",
  forAdmin,
}: CreateNotificationParams) {
  try {
    if (!receiverIds.length) return null;

    const notifications = receiverIds.map((receiverId) => ({
      title,
      message,
      type,
      typeRef,
      relatedId,
      relatedData,
      userId,
      receiverId,
      status,
      forAdmin,
    }));

    await NotificationModel.insertMany(notifications);
    return true;
  } catch (err) {
    console.error("❌ Notification creation failed:", err);
    return false;
  }
}

/**
 * Notify all users with a specific userType ("user", "admin")
 */
export async function notifyUsersByType(
  userType: "user" | "admin",
  payload: Omit<CreateNotificationParams, "receiverIds">
) {
  const users = await User.find({ userType }, "_id");
  const receiverIds = users.map(
    (u) => new mongoose.Types.ObjectId(u._id as string)
  );
  if (!receiverIds.length) return;

  await createNotification({ ...payload, receiverIds });
}
