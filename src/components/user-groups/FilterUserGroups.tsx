import { Filter } from 'components/common';
import { useLazyUserGroupsOptions, useUserGroupsOptions } from 'hooks';
import { unionBy } from 'lodash';
import { sidebarMenuMessages, userGroupsMessages } from 'messages';
import { PropsWithChildren } from 'react';
import { FindAllUserGroupDto } from 'types';

type FilterUserGroupsProps = PropsWithChildren &
  Omit<FindAllUserGroupDto, 'keyword' | 'pageIndex' | 'pageSize'> & {
    icon?: React.JSX.Element;
  };

const FilterUserGroups = ({ userGroupId, organizationUnitId, ...props }: FilterUserGroupsProps) => {
  const { userGroups: userGroupssSelected } = useUserGroupsOptions(
    {
      userGroupId,
      organizationUnitId
    },
    {
      skip: !userGroupId || userGroupId?.length === 0,
      refetchOnMountOrArgChange: true
    }
  );

  const { fetchData, handleLoadMore, hasMore, userGroups, isLoading } = useLazyUserGroupsOptions();

  const handleSearch = (val: string) => {
    fetchData({ keyword: val });
  };

  const data = unionBy(userGroupssSelected, userGroups, (o) => o.userGroupId);

  return (
    <Filter.CheckboxSearch
      {...props}
      options={data.map((o) => ({
        label: o.name,
        value: o.userGroupId
      }))}
      onSearch={handleSearch}
      loadMore={handleLoadMore}
      title={sidebarMenuMessages.userGroups}
      loading={isLoading}
      hasMore={hasMore}
      fetchData={() =>
        fetchData({
          organizationUnitId
        })
      }
      placeholder={userGroupsMessages.userGroupName}
    />
  );
};
export default FilterUserGroups;
