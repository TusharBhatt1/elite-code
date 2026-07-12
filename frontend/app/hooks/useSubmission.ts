// hooks/useSubmission.ts

import { useQuery } from "@tanstack/react-query";
import { getSubmission } from "../apis/queries/submission";

export function useSubmission(id?: string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: () => getSubmission(id!),
    enabled: !!id,

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "pending" || status === "running") {
        return 1000;
      }

      return false;
    },
  });
}