import { Filter } from 'components/common';
import { useLazyOrganizationUnitsOptions, useOrganizationUnitsOptions } from 'hooks';
import { unionBy } from 'lodash';
import { organizationUnitsMessages } from 'messages';
import React, { PropsWithChildren } from 'react';
import { FindAllOrganizationUnitDto } from 'types';

type FilterOrganizationUnitsProps = PropsWithChildren &
  Omit<FindAllOrganizationUnitDto, 'keyword' | 'pageIndex' | 'pageSize'> & {
    icon?: React.JSX.Element;
    title?: string;
  };

const FilterOrganizationUnits = ({ title, parentId, organizationUnitId, ...props }: FilterOrganizationUnitsProps) => {
  const { organizationsUnits: organizationsUnitsSelected } = useOrganizationUnitsOptions(
    {
      organizationUnitId
    },
    {
      skip: !organizationUnitId || organizationUnitId?.length === 0,
      refetchOnMountOrArgChange: true
    }
  );

  const { fetchData, handleLoadMore, hasMore, organizationsUnits, isLoading } = useLazyOrganizationUnitsOptions();

  const handleSearch = (val: string) => {
    fetchData({ keyword: val });
  };

  const data = unionBy(organizationsUnitsSelected, organizationsUnits, (o) => o.organizationUnitId);

  return (
    <Filter.CheckboxSearch
      {...props}
      options={data.map((o) => ({
        label: o.name,
        value: o.organizationUnitId
      }))}
      onSearch={handleSearch}
      loadMore={handleLoadMore}
      title={title ?? organizationUnitsMessages.shortTitle}
      placeholder={organizationUnitsMessages.organizationUnitName}
      loading={isLoading}
      hasMore={hasMore}
      fetchData={() =>
        fetchData({
          parentId
        })
      }
    />
  );
};
export default FilterOrganizationUnits;
