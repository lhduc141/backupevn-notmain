import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useOrganizationUnitsOptions } from 'hooks';
import { useState } from 'react';
import { FindAllOrganizationUnitDto } from 'types';

type SelectOrganizationUnitsProps = SelectProps &
  Omit<FindAllOrganizationUnitDto, 'keyword' | 'pageIndex' | 'pageSize'>;

const SelectOrganizationUnits = ({ parentId, ...props }: SelectOrganizationUnitsProps) => {
  const [keyword, setKeyword] = useState('');

  const { organizationsUnits, resetPage, handleLoadMore, hasMore, isLoading, isFetching } = useOrganizationUnitsOptions(
    {
      parentId,
      keyword
    }
  );

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };
  return (
    <Select
      {...props}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      loading={isLoading || isFetching}
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      options={
        organizationsUnits.map((itm) => ({
          label: itm.name,
          value: itm.organizationUnitId
        })) || []
      }
    />
  );
};
export default SelectOrganizationUnits;
