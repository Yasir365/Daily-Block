"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "/api/blogs";

// ✅ Fetch all blogs
export const useFetchBlogs = (status: string = "all") => {
  return useQuery({
    queryKey: ["blogs", status],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}?status=${status}`);
      return res.data;
    },
  });
};

// ✅ Create a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_URL, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

// ✅ Delete a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${API_URL}?id=${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
