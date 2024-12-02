import { Skeleton } from 'antd';
import { InfiniteScroll, InputSearchV2 } from 'components/common';
import { RightSideCheckbox } from 'components/common/checkbox';
import { useRolesOptions } from 'hooks/roles';
import { uniqBy } from 'lodash';
import { rolesMessages } from 'messages';
import { useState } from 'react';
import { FindAllRoleDto, RoleCompactDto } from 'types';

type CheckboxRolesProps = Omit<FindAllRoleDto, 'keyword' | 'pageIndex' | 'pageSize'> & {
  value?: RoleCompactDto[];
  onChange: (value: RoleCompactDto[]) => void;
  maxHeight?: string | number | undefined;
};

const CheckboxRoles = ({ value, onChange, maxHeight }: CheckboxRolesProps) => {
  const [keyword, setKeyword] = useState('');

  const { roleOptions, handleLoadMore, isLoading, isFetching, hasMore, resetPage } = useRolesOptions({
    keyword
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };

  const formatData = (data: RoleCompactDto[]): any[] => {
    if (data.length === 0) return [];

    return data.map((item) => ({
      key: item.roleId.toString(),
      value: item.roleId.toString(),
      label: item.name
    }));
  };

  const handleChange = (selectedValue: string[]) => {
    const selectedIds = selectedValue.map((val) => Number(val));
    const selectedRoles = uniqBy([...(value || []), ...roleOptions], 'roleId').filter((opt) =>
      selectedIds.includes(opt.roleId)
    );
    onChange(selectedRoles);
  };
  return (
    <div>
      <InputSearchV2 className='mb-2' placeholder={rolesMessages.name} onChange={(e) => handleSearch(e.toString())} />
      <InfiniteScroll
        loader={<Skeleton active={isLoading} title={false} paragraph={{ rows: 5 }} />}
        hasMore={hasMore}
        next={handleLoadMore}
        isLoading={isLoading || isFetching}
      >
        <RightSideCheckbox
          options={formatData(roleOptions)}
          onChange={handleChange}
          value={value?.map((item) => item.roleId.toString())}
          split
        />
      </InfiniteScroll>
    </div>
  );
};

export default CheckboxRoles;
