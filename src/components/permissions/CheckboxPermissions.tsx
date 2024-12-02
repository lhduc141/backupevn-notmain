import { Skeleton } from 'antd';
import { InfiniteScroll, InputSearchV2 } from 'components/common';
import { RightSideCheckbox } from 'components/common/checkbox';
import { usePermissionsOptions } from 'hooks';
import { uniqBy } from 'lodash';
import { permissionsMessages } from 'messages';
import { useState } from 'react';
import { FindAllPermissionDto, PermissionCompactDto } from 'types';

type CheckboxPermissionsProps = Omit<FindAllPermissionDto, 'keyword' | 'pageIndex' | 'pageSize'> & {
  value?: PermissionCompactDto[];
  onChange: (value: PermissionCompactDto[]) => void;
  organizationUnitIds?: number[];
};

const CheckboxPermissions = ({ value, onChange, organizationUnitIds }: CheckboxPermissionsProps) => {
  const [keyword, setKeyword] = useState('');

  const { permissionsOptions, handleLoadMore, isLoading, isFetching, hasMore, resetPage } = usePermissionsOptions({
    keyword,
    organizationUnitIds
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };

  const formatData = (data: PermissionCompactDto[]): any[] => {
    if (data.length === 0) return [];

    return data.map((item) => ({
      key: item.permissionId.toString(),
      value: item.permissionId.toString(),
      label: item.name
    }));
  };

  const handleChange = (selectedValue: string[]) => {
    const selectedIds = selectedValue.map((val) => Number(val));
    const selectedPermissions = uniqBy([...(value || []), ...permissionsOptions], 'permissionId').filter((opt) =>
      selectedIds.includes(opt.permissionId)
    );
    onChange(selectedPermissions);
  };

  return (
    <div>
      <InputSearchV2
        className='mb-2'
        placeholder={permissionsMessages.name}
        onChange={(e) => handleSearch(e.toString())}
      />
      <InfiniteScroll
        loader={<Skeleton active={isLoading} title={false} paragraph={{ rows: 5 }} />}
        hasMore={hasMore}
        next={handleLoadMore}
        isLoading={isLoading || isFetching}
      >
        <RightSideCheckbox
          options={formatData(permissionsOptions)}
          onChange={handleChange}
          value={value?.map((item) => item.permissionId.toString())}
          split
        />
      </InfiniteScroll>
    </div>
  );
};

export default CheckboxPermissions;
