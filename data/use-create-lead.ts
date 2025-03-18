import { LeadSchema } from "@/schema/lead-schema";
import { useMutation } from "@tanstack/react-query";

export const useCreateLead = () => {
  return useMutation({
    mutationFn: async (data: LeadSchema) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead form.");
      }
    },
  });
};
