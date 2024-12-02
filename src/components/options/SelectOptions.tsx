import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useOptions } from 'hooks';
import { useOptionsDefault } from 'hooks/options/useOptionsDefault';
import { useEffect } from 'react';
import { FindAllOptionsDto } from 'types';

type SelectOptionsProps = SelectProps & Pick<FindAllOptionsDto, 'optionTypeId' | 'service'>;

const SelectOptions = ({ optionTypeId, service, ...props }: SelectOptionsProps) => {
  const { data, handleSearch, isLoading } = useOptions({
    optionTypeId,
    service
  });
  const { optionsDefault, isLoading: isLoadingDefault } = useOptionsDefault({
    optionTypeId,
    service
  });
  useEffect(() => {
    if (optionsDefault && optionsDefault.length > 0) {
      const itmDefault = optionsDefault[0];
      props.onChange?.(itmDefault.optionId, {
        label: itmDefault.name,
        value: itmDefault.optionId
      });
    }
  }, [optionsDefault]);
  return (
    <Select
      showSearch
      {...props}
      filterOption={false}
      onSearch={handleSearch}
      loading={isLoading || isLoadingDefault}
      options={data.map((itm) => ({
        label: itm.name,
        value: itm.optionId
      }))}
    />
  );
};
export default SelectOptions;
