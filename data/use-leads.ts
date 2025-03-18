import { Lead } from "@/api/entities/lead";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseLeadsParams {
  status?: Lead["status"];
  search?: string;
}

export const useLeads = ({ status, search }: UseLeadsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["leads", status, search],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams();
      params.set("skip", pageParam.toString());
      params.set("take", "10");
      if (status) {
        params.set("status", status);
      }
      if (search) {
        params.set("search", search);
      }
      const response = await fetch(`/api/leads?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to get leads.");
      }
      const { leads } = await (response.json() as Promise<{ leads: Lead[] }>);
      return {
        leads,
        nextPage: leads.length === 10 ? pageParam + 1 : undefined,
        prevPage: pageParam > 1 ? pageParam - 1 : undefined,
        currentPage: pageParam,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
  });
};
