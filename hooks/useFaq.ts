import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ✅ FETCH ALL FAQs */
export const useFetchFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch("/api/faq");
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const data = await res.json();
      return data.data || [];
    },
  });
};

/* ✅ CREATE FAQ */
export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faq: FaqItem) => {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
      });
      if (!res.ok) throw new Error("Failed to create FAQ");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

/* ✅ DELETE FAQ */
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/faq?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete FAQ");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
