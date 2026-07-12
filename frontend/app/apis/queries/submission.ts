// apis/queries/submission.ts

import { api } from "@/app/lib/axios";

export async function getSubmission(id: string) {
  const { data } = await api.get(`/submission/${id}`,{
    baseURL:"http://localhost:3001/api/v1"
  });

  return data.data;
}