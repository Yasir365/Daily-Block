// src/services/newsletterService.ts

export const subscribeToNewsletter = async (email: string) => {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Failed to subscribe");
  return data.data;
};

export const fetchSubscribers = async () => {
  const res = await fetch("/api/newsletter", { cache: "no-store" });
  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to fetch subscribers");
  return data.data;
};

export const updateSubscriberStatus = async (
  id: string,
  status: "active" | "blocked"
) => {
  const res = await fetch("/api/newsletter", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });

  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to update subscriber status");
  return data.data;
};
