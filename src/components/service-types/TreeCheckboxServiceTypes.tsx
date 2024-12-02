import { InfiniteScroll } from 'components/common';
import { RightSideCheckbox } from 'components/common/checkbox';
import { useServiceTypesOptions } from 'hooks';
import { FindAllServiceTypeDto, ServiceTypeCompactDto } from 'types';

type TreeCheckboxServiceTypeProps = FindAllServiceTypeDto & {
  value?: number[];
  onChange: (value: number[]) => void;
};

const TreeCheckboxServiceTypes = ({ value, onChange, ...props }: TreeCheckboxServiceTypeProps) => {
  const { serviceTypesOptions, isLoading, hasMore, handleLoadMore, isFetching } = useServiceTypesOptions(props);

  const formatData = (data: ServiceTypeCompactDto[]): any[] => {
    if (data.length === 0) return [];

    return data.map((item) => ({
      key: item.serviceTypeId.toString(),
      value: item.serviceTypeId.toString(),
      label: item.name,
      children: item.childrenCompact && item.childrenCompact.length > 0 ? formatData(item.childrenCompact) : []
    }));
  };

  const handleChange = (selectedValue: string[]) => {
    onChange?.(selectedValue.map((val) => Number(val)));
  };

  return (
    <InfiniteScroll isLoading={isLoading || isFetching} hasMore={hasMore} next={handleLoadMore}>
      <RightSideCheckbox
        options={formatData(serviceTypesOptions || [])}
        onChange={handleChange}
        value={value?.map((item) => item.toString())}
        selectAll
      />
    </InfiniteScroll>
  );
};

export default TreeCheckboxServiceTypes;
