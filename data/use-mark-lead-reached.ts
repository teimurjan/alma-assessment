import { Lead } from "@/api/entities/lead";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useMarkLeadReached = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark lead reached.");
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueriesData<InfiniteData<{ leads: Lead[] }>>(
        { queryKey: ["leads"] },
        (data) => {
          if (!data) {
            return data;
          }

          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              leads: page.leads.map((lead) => {
                if (lead.id === id) {
                  return { ...lead, status: "REACHED_OUT" as const };
                }
                return lead;
              }),
            })),
          };
        }
      );
    },
  });
};
