import { Col, Radio, Row } from 'antd';
import { find } from 'lodash';
import { useState } from 'react';
import FilterOrigin, { FilterPopoverOptionItem } from './Filter';

type FilterRadioProps = React.ComponentProps<typeof FilterOrigin> & {
  options: FilterPopoverOptionItem[];
};
const FilterRadio = ({ value, options, children, icon, title, ...props }: FilterRadioProps) => {
  const [valueTemp, setValueTemp] = useState(value);
  const content = (
    <Radio.Group
      onChange={(e) => {
        setValueTemp(e.target.value);
      }}
      value={valueTemp}
      className='max-w-sm'
    >
      <Row align='middle' gutter={0}>
        {options.map((o) => (
          <Col span={24} key={o.value?.toString() || ''}>
            <Radio style={{ width: '100%' }} value={o.value}>
              {o.label}
            </Radio>
          </Col>
        ))}
      </Row>
    </Radio.Group>
  );
  const childrenLabel = (
    <p className='line-clamp-1'>
      {children || (
        <>
          {icon}
          {find(options, { value: value })?.label || title || value}
        </>
      )}
    </p>
  );
  return (
    <FilterOrigin
      {...props}
      title={title}
      content={content}
      valueTemp={valueTemp}
      clearFilter={() => setValueTemp(undefined)}
      value={value}
      setValueTemp={setValueTemp}
    >
      {childrenLabel}
    </FilterOrigin>
  );
};

export default FilterRadio;
