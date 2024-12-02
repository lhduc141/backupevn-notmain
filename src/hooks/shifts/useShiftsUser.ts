import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useGetShiftsUserQuery } from 'services';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useShiftsUser(userId: number) {
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [keyword, setKeyword] = useState('');
  const { data: dataResponse, isLoading } = useGetShiftsUserQuery(
    {
      keyword,
      pageIndex: pageIndex,
      pageSize,
      userId
    },
    {
      skip: !userId,
      refetchOnMountOrArgChange: true
    }
  );

  const { rows, count } = dataResponse?.data || {};

  const handleLoadMore = () => {
    if (rows && count && rows.length < count) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handleSearch = (value: string) => {
    debouncedKeywordChange(value);
  };

  const debouncedKeywordChange = useCallback(
    debounce((keywordValue: string) => {
      setKeyword(keywordValue);
      setPageIndex(1);
    }, 500),
    [setKeyword]
  );

  return {
    userShift: rows || [],
    count: count || 0,
    isLoading,
    handleLoadMore,
    handleSearch,
    hasMore: rows && count ? rows.length < count : false
  };
}
