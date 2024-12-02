import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { usePermissionsOptions } from 'hooks';
import { useState } from 'react';
import { FindAllPermissionDto } from 'types';

type SelectPermissionsProps = SelectProps & Omit<FindAllPermissionDto, 'keyword' | 'pageIndex' | 'pageSize'>;

const SelectPermissions = ({ ...props }: SelectPermissionsProps) => {
  const [keyword, setKeyword] = useState('');

  const { permissionsOptions, handleLoadMore, isLoading, isFetching, hasMore, resetPage } = usePermissionsOptions({
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
        permissionsOptions.map((itm) => ({
          ...itm,
          label: itm.name,
          value: itm.permissionId
        })) || []
      }
      onChange={() => handleSearch('')}
    />
  );
};
export default SelectPermissions;
