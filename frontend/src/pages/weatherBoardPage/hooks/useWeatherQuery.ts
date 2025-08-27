import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useWeatherQuery = <TData = unknown>(
  queryKey: readonly string[],
  queryFn: () => Promise<TData>,
  options?: Partial<UseSuspenseQueryOptions<TData>>
) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await queryFn();
        return result;
      } catch (error) {
        // 재시도 횟수를 확인하여 최종 실패 시에만 캐시 제거
        const query = queryClient.getQueryState(queryKey);
        if (query && query.fetchFailureCount >= 2) {
          // 모든 재시도가 끝난 후 캐시에서 제거
          setTimeout(() => {
            queryClient.removeQueries({ queryKey });
          }, 100);
        }
        throw error;
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: failureCount => {
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    ...options,
  });
};
