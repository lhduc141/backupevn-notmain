import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useReasonsOptions } from 'hooks';
import { useState } from 'react';
import { FindAllReasonDto } from 'types';

type ReasonsProps = SelectProps & Omit<FindAllReasonDto, 'keyword' | 'pageIndex' | 'pageSize'>;

const Reasons = ({ ...props }: ReasonsProps) => {
  const [keyword, setKeyword] = useState('');

  const { reasonsOptions, handleLoadMore, isLoading, isFetching, hasMore, resetPage } = useReasonsOptions({
    keyword
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };
  return (
    <Select
      {...props}
      onLoadMore={handleLoadMore}
      loading={isLoading || isFetching}
      hasMore={hasMore}
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      options={
        reasonsOptions.map((itm) => ({
          label: itm.content,
          value: itm.reasonId
        })) || []
      }
    />
  );
};
export default Reasons;
