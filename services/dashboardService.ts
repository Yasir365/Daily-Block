// src/services/dashboardService.ts

export const fetchDashboardStats = async () => {
  const res = await fetch("/api/dashboard/stats", {
    cache: "no-store", // ✅ prevents Next.js static caching
  });

  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to fetch dashboard stats");
  return data.data;
};
// src/services/dashboardService.ts

export const fetchGraphStats = async (mode = "weekly") => {
  const res = await fetch(`/api/stats?mode=${mode}`, {
    cache: "no-store",
  });

  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to fetch dashboard stats");

  return data.data;
};
