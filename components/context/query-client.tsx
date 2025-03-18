"use client";

import {
  QueryClientProvider as TanstackQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
};
