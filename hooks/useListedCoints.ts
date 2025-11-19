import { useQuery } from "@tanstack/react-query";

async function fetchNewlyListed({ queryKey }: any) {
  const [_key, params] = queryKey;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]: any) => {
    if (value !== "" && value !== false && value !== undefined) {
      query.set(key, value as string);
    }
  });

  const qs = query.toString() ? `?${query.toString()}` : "";

  const res = await fetch(`/api/dashboard/newlyListed${qs}`);
  return res.json();
}

export const useNewlyListed = (filters: any) => {
  return useQuery({
    queryKey: ["newly-listed", filters],
    queryFn: fetchNewlyListed,
  });
};
