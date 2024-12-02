import { Filter } from 'components/common';
import { useOptions } from 'hooks';
import React, { PropsWithChildren } from 'react';
import { FindAllOptionsDto } from 'types';

type FilterOptionsProps = PropsWithChildren &
  Pick<FindAllOptionsDto, 'optionTypeId' | 'service'> & {
    title?: string;
    icon?: React.JSX.Element;
  };

const FilterOptions = ({ optionTypeId, service, title, ...props }: FilterOptionsProps) => {
  const { data, handleSearch, isLoading } = useOptions(
    {
      optionTypeId,
      service
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  return (
    <Filter.CheckboxSearch
      {...props}
      options={data.map((o) => ({
        label: o.name,
        value: o.optionId
      }))}
      title={title || ''}
      onSearch={handleSearch}
      loading={isLoading}
      placeholder={title}
    />
  );
};
export default FilterOptions;
