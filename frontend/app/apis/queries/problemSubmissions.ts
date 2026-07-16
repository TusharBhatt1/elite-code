import { apiClient } from '@/app/lib/axios';

export async function getProblemSubmissions(problemId: string, page: number = 1, limit: number = 10) {
  const { data } = await apiClient.get(
    `/submission/problem/${problemId}?page=${page}&limit=${limit}`
  );
  return data.data;
}
