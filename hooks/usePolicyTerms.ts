import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Fetch policy by type
export const useFetchPolicy = (type: "privacy" | "terms") => {
  return useQuery({
    queryKey: ["policy", type],
    queryFn: async () => {
      const res = await fetch(`/api/policy-terms?type=${type}`);
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to fetch policy");
      return data.data[0] || null;
    },
  });
};

// ✅ Save / Update policy
export const useSavePolicy = (type: "privacy" | "terms") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/policy-terms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to save policy");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policy", type] });
    },
  });
};
