import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useRolesOptions } from 'hooks/roles';
import { useState } from 'react';
import { FindAllRoleDto } from 'types';

type SelectRolesOptionsProps = SelectProps & Omit<FindAllRoleDto, 'pageIndex' | 'pageSize' | 'keyword'>;

const SelectRolesOptions = ({ ...props }: SelectRolesOptionsProps) => {
  const [keyword, setKeyword] = useState('');

  const { roleOptions, handleLoadMore, isLoading, isFetching, hasMore, resetPage } = useRolesOptions({
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
        roleOptions.map((itm) => ({
          ...itm,
          label: itm.name,
          value: itm.roleId
        })) || []
      }
      onChange={() => handleSearch('')}
    />
  );
};
export default SelectRolesOptions;
