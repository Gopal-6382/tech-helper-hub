"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reportApi } from "@/features/posts/api/report.api";
import type { CreateReportData } from "@/features/posts/types/report.types";

export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReportData) => reportApi.createReport(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports", "my"],
      });
    },
  });
}
