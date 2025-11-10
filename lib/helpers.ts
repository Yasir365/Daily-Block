export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // 🕒 If less than 1 minute
  if (diffMin < 1) return "Just now";

  // 🕐 If less than 1 hour
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;

  // 🕓 If less than 24 hours
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;

  // 📅 If less than 7 days
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  // 🗓️ Otherwise, show full date
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
