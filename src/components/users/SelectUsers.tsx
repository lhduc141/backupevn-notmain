import { Typography } from 'antd';
import { Avatar, Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useUsersOptions } from 'hooks';
import { useState } from 'react';
import { FindAllUserDto } from 'types';

type SelectUsersProps = SelectProps & Omit<FindAllUserDto, 'keyword' | 'pageIndex' | 'pageSize'>;

const SelectUsers = ({ organizationUnitId, ...props }: SelectUsersProps) => {
  const [keyword, setKeyword] = useState('');

  const { usersOptions, handleLoadMore, isLoading, resetPage, isFetching, hasMore } = useUsersOptions({
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
        usersOptions.map((itm) => ({
          ...itm,
          label: (
            <div className='flex items-center gap-2'>
              <Avatar size={24} name={itm.fullName} fileId={itm.avatar} />
              <Typography.Text>{itm.fullName}</Typography.Text>
            </div>
          ),
          value: itm.userId
        })) || []
      }
      onDropdownVisibleChange={(open) => {
        if (!open) {
          handleSearch('');
        }
      }}
    />
  );
};
export default SelectUsers;
