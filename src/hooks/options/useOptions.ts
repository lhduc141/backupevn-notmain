import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useGetOptionsQuery } from 'services/options';
import { FindAllOptionsDto, UseQueryOptionsType } from 'types';
export function useOptions(
  { optionTypeId, service }: Pick<FindAllOptionsDto, 'optionTypeId' | 'service'>,
  options?: UseQueryOptionsType
) {
  const [keyword, setKeyword] = useState('');
  const {
    data: optionsResponse,
    error,
    isLoading
  } = useGetOptionsQuery(
    {
      keyword,
      optionTypeId,
      service
    },
    options
  );

  const debouncedKeywordChange = useCallback(
    debounce((keywordValue: string) => {
      setKeyword(keywordValue);
    }, 500),
    [setKeyword]
  );

  const handleSearch = (value: string) => {
    debouncedKeywordChange(value);
  };

  return {
    data: optionsResponse?.data.rows || [],
    count: optionsResponse?.data.count || 0,
    isLoading,
    error,

    keyword,
    handleSearch
  };
}
