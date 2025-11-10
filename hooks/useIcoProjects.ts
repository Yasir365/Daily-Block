// 📁 src/hooks/useIcoProjects.ts
"use client";
import { cointStatus } from "@/components/ProjectCard/ProjectRow";
import { useQuery } from "@tanstack/react-query";

export interface IcoProject {
  coinAbbreviation: string;
  cryptoCoinName: string;
  icoStartDate: string;
  icoEndDate: string;
  totalSupply: string;
  icoTokenPrice: string;
  received?: number;
  websiteLink: string;
  status: cointStatus;
  _id: string;
} 

export const useIcoProjects = (status: string) => {
  return useQuery({
    queryKey: ["ico-projects", status],
    queryFn: async () => {
      const res = await fetch(`/api/ico/list?status=${status}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch ICOs");
      return data.data as IcoProject[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
