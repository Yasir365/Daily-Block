import { useQuery } from "@tanstack/react-query";

export const useUsers = (filters: any, enabled = false) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/users?${params}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    enabled,
  });
};
