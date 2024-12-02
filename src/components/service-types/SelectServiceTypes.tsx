import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useServiceTypesOptions } from 'hooks';
import { useState } from 'react';
import { SERVICE_TYPE_SELECT_ALL } from 'utils';

type SelectServiceTypesProps = SelectProps & {
  isAll?: boolean;
  isActive?: boolean;
};

const SelectServiceTypes = ({ isAll = false, isActive, ...props }: SelectServiceTypesProps) => {
  const [keyword, setKeyword] = useState('');
  const { serviceTypesOptions, hasMore, handleLoadMore, resetPage, isLoading, isFetching } = useServiceTypesOptions({
    isActive,
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
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      hasMore={hasMore}
      options={[
        ...(isAll ? [SERVICE_TYPE_SELECT_ALL] : []),
        ...(serviceTypesOptions.map((itm) => ({
          label: itm.name,
          value: itm.serviceTypeId
        })) || [])
      ]}
    />
  );
};
export default SelectServiceTypes;
