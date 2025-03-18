import { SignInSchema } from "@/schema/sign-in-schema";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok || !responseData.authenticated) {
        throw new Error(responseData.error || "Sign in failed.");
      }
    },
  });
};
