import { Checkbox, Col, Row, Typography } from 'antd';
import { find } from 'lodash';
import React, { useState } from 'react';
import FilterOrigin, { FilterPopoverOptionItem } from './Filter';

type FilterCheckboxProps = React.ComponentProps<typeof FilterOrigin> & {
  options: FilterPopoverOptionItem[];
};
const FilterCheckbox = ({ value = [], options, children, icon, title, ...props }: FilterCheckboxProps) => {
  const [valueTemp, setValueTemp] = useState(value);
  const content = (
    <Checkbox.Group
      onChange={(val) => {
        setValueTemp(val);
      }}
      value={valueTemp}
    >
      <Row style={{ maxWidth: 250 }} align='middle'>
        {options.map((o, idx) => (
          <Col span={24} key={o.value?.toString() || `key-${idx}`}>
            <Checkbox style={{ width: '100%' }} value={o.value}>
              {o.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
  const childrenLabel = children || (
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
        title
      )}
    </>
  );

  return (
    <FilterOrigin
      {...props}
      title={title}
      content={content}
      valueTemp={valueTemp}
      clearFilter={() => {
        setValueTemp([]);
      }}
      value={value}
      setValueTemp={setValueTemp}
    >
      {childrenLabel}
    </FilterOrigin>
  );
};

export default FilterCheckbox;
