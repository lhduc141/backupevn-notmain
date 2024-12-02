import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useUserGroupsOptions } from 'hooks';
import { useState } from 'react';
import { FindAllUserGroupDto } from 'types';

type SelectUserGroupsProps = SelectProps & Omit<FindAllUserGroupDto, 'pageIndex' | 'pageSize' | 'keyword'>;

const SelectUserGroups = ({ organizationUnitId, ...props }: SelectUserGroupsProps) => {
  const [keyword, setKeyword] = useState('');

  const {
    userGroups: organizationsUnits,
    handleLoadMore,
    resetPage,
    isLoading,
    isFetching,
    hasMore
  } = useUserGroupsOptions({
    keyword,
    organizationUnitId
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
        organizationsUnits.map((itm) => ({
          label: itm.name,
          value: itm.userGroupId
        })) || []
      }
    />
  );
};
export default SelectUserGroups;
