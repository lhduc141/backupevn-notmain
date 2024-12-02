import { TooltipPlacement } from 'antd/es/tooltip';
import { ServiceTypeIcon } from 'assets';
import { Filter } from 'components/common';
import { useLazyServiceTypesOptions, useServiceTypesOptions } from 'hooks';
import { unionBy } from 'lodash';
import { sidebarMenuMessages } from 'messages';
import { PropsWithChildren } from 'react';
import { FindAllServiceTypeDto } from 'types';

type FilterServiceTypesProps = PropsWithChildren &
  Omit<FindAllServiceTypeDto, 'keyword' | 'pageIndex' | 'pageSize'> & {
    placement?: TooltipPlacement;
  };

const FilterServiceTypes = ({ parentId, isActive, serviceTypeId, ...props }: FilterServiceTypesProps) => {
  const { serviceTypesOptions: serviceTypesOptionsSelected } = useServiceTypesOptions(
    {
      serviceTypeId
    },
    { skip: serviceTypeId?.length === 0, refetchOnMountOrArgChange: true }
  );

  const { fetchData, handleLoadMore, hasMore, serviceTypesOptions, isLoading } = useLazyServiceTypesOptions();

  const handleSearch = (val: string) => {
    fetchData({ keyword: val, isActive });
  };

  const data = unionBy(serviceTypesOptionsSelected, serviceTypesOptions, (o) => o.serviceTypeId);
  return (
    <Filter.CheckboxSearch
      icon={<ServiceTypeIcon />}
      {...props}
      options={data.map((o) => ({
        label: o.name,
        value: o.serviceTypeId,
        disabled:
          !serviceTypesOptions.map((option) => option.serviceTypeId).includes(o.serviceTypeId) &&
          !serviceTypeId?.includes(o.serviceTypeId)
      }))}
      onSearch={handleSearch}
      loadMore={handleLoadMore}
      title={sidebarMenuMessages.serviceTypes}
      loading={isLoading}
      hasMore={hasMore}
      fetchData={() =>
        fetchData({
          parentId,
          isActive
        })
      }
    />
  );
};
export default FilterServiceTypes;
