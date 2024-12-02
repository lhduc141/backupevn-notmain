export type UseQueryOptionsType = {
  pollingInterval?: number;
  refetchOnFocus?: boolean;
  skipPollingIfUnfocused?: boolean;
  refetchOnMountOrArgChange?: number | boolean;
  refetchOnReconnect?: boolean;
  skip?: boolean;
  selectFromResult?: any;
  forceRefetch?: () => boolean;
  keepUnusedDataFor?: number;
};
