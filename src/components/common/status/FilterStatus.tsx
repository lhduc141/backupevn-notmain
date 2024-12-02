import { Filter } from 'components/common';
import { messages } from 'messages';
import { PropsWithChildren, useState } from 'react';

type FilterStatusProps = PropsWithChildren & { icon?: React.JSX.Element };

const STATUS_OPTION = [
  {
    label: messages.statusEnum.active,
    value: 'true'
  },
  {
    label: messages.statusEnum.inactive,
    value: 'false'
  }
];

const FilterStatus = ({ ...props }: FilterStatusProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (val: string) => {
    setKeyword(val);
  };

  return (
    <Filter.CheckboxSearch
      {...props}
      options={STATUS_OPTION.filter((option) => option.label.includes(keyword))}
      onSearch={handleSearch}
      title={messages.status}
      placeholder={messages.status}
    />
  );
};
export default FilterStatus;
