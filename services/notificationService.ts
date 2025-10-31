// /services/notificationService.ts
import axios from "axios";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginatedResponse {
  success: boolean;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  notifications: Notification[];
}

/**
 * ✅ Fetch notifications with flexible options
 * @param {Object} options
 * @param {number} [options.limit] - limit count (e.g. 3 for recent)
 * @param {number} [options.page] - page number for pagination
 * @param {"all"|"paginated"|"limited"} [options.mode] - fetch type
 */
export async function fetchNotifications({
  limit,
  page,
  mode = "all",
}: {
  limit?: number;
  page?: number;
  mode?: "all" | "paginated" | "limited";
}): Promise<PaginatedResponse | any> {
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit.toString());
  if (page) params.append("page", page.toString());
  if (mode) params.append("mode", mode);

  const res = await axios.get(`/api/notifications?${params.toString()}`);

  return res.data;
}

/**
 * ✅ Mark a single notification as read
 */
export async function markNotificationRead(id: string) {
  const res = await axios.patch("/api/notifications", { id });
  return res.data;
}

/**
 * ✅ Mark all notifications as read
 */
export async function markAllNotificationsRead() {
  const res = await axios.patch("/api/notifications", { markAll: true });
  return res.data;
}
