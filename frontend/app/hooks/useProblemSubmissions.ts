import { useQuery } from '@tanstack/react-query';
import { getProblemSubmissions } from '../apis/queries/problemSubmissions';

export function useProblemSubmissions(problemId: string, page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['problem-submissions', problemId, page, limit],
    queryFn: () => getProblemSubmissions(problemId, page, limit),
    enabled: !!problemId,
  });
}
