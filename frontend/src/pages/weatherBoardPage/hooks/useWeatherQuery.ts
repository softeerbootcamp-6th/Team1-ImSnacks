import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export const useWeatherQuery = <TData = unknown>(
  queryKey: readonly string[],
  queryFn: () => Promise<TData>,
  options?: Partial<UseSuspenseQueryOptions<TData>>
) => {
  return useSuspenseQuery({
    queryKey,
    queryFn,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
    retry: failureCount => {
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    gcTime: 3000,
    ...options,
  });
};
