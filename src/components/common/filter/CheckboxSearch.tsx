import { Checkbox, Tooltip, Typography } from 'antd';
import { find } from 'lodash';
import { useState } from 'react';
import FilterOrigin, { FilterPopoverOptionItem } from './Filter';
import FilterSearchBox from './FilterSearchBox';
import { messages } from 'messages';

type FilterCheckboxSearchProps = React.ComponentProps<typeof FilterOrigin> & {
  options: FilterPopoverOptionItem[];
  onSearch: (value: string) => void;
  loadMore?: () => void;
  loading?: boolean;
  fetchData?: () => void;
  hasMore?: boolean;
  placeholder?: string;
  title: string;
};
const FilterCheckboxSearch = ({
  value = [],
  options,
  children,
  icon,
  title,
  loadMore,
  onSearch,
  loading = false,
  fetchData,
  hasMore,
  placeholder,
  ...props
}: FilterCheckboxSearchProps) => {
  const [valueTemp, setValueTemp] = useState(value);
  const content = (
    <Checkbox.Group
      onChange={(val) => {
        setValueTemp(val);
      }}
      value={valueTemp}
      style={{ maxWidth: 250 }}
    >
      <FilterSearchBox
        hasMore={Boolean(hasMore)}
        options={options}
        renderItem={(item) => (
          <Checkbox style={{ width: '100%' }} value={item.value} disabled={item.disabled}>
            <Tooltip trigger={item.disabled ? 'hover' : []} title={messages.optionIsNotActive}>
              {item.label}
            </Tooltip>
          </Checkbox>
        )}
        isLoading={loading}
        loadMore={loadMore}
        onSearch={onSearch}
        placeholder={placeholder}
      />
    </Checkbox.Group>
  );
  const childrenLabel = children ?? (
    <>
      {icon}
      {value && value?.length > 0 ? (
        <Typography.Paragraph
          className='mb-0 max-w-[175px] text-sm'
          ellipsis={{
            rows: 1,
            tooltip: true
          }}
        >
          {value.map((o: any) => find(options, { value: o })?.label).join(', ')}
        </Typography.Paragraph>
      ) : (
        <p className='mb-0 line-clamp-1'>{title}</p>
      )}
    </>
  );

  return (
    <FilterOrigin
      {...props}
      content={content}
      valueTemp={valueTemp}
      clearFilter={() => {
        setValueTemp([]);
      }}
      value={value}
      setValueTemp={setValueTemp}
      onOpenChange={(open) => {
        if (open && fetchData) fetchData();
      }}
    >
      {childrenLabel}
    </FilterOrigin>
  );
};

export default FilterCheckboxSearch;
