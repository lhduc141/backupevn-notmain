import { Checkbox, Col, Divider, Radio, Row } from 'antd';
import React, { useState } from 'react';
import FilterOrigin, { FilterPopoverOptionItem } from './Filter';

type FilterCheckboxProps<T = any> = React.ComponentProps<typeof FilterOrigin> & {
  valueRadio?: string | number | null;
  valueCheckbox?: T[];
  optionsCheckbox: FilterPopoverOptionItem[];
  optionsRadio: FilterPopoverOptionItem[];
};
const FilterCheckboxRadio = <T extends any>({
  valueRadio,
  valueCheckbox,
  optionsRadio,
  optionsCheckbox,
  ...props
}: FilterCheckboxProps) => {
  const [valueTemp, setValueTemp] = useState<{
    radio?: string | number | null;
    checkbox?: T[];
  }>({
    radio: valueRadio,
    checkbox: valueCheckbox
  });
  const renderCheckBox = () => {
    const options = optionsCheckbox;
    if (options)
      return (
        <React.Fragment>
          <Divider style={{ marginBottom: 'var(--spacing-3)' }} />
          <Checkbox.Group
            onChange={(val) => {
              setValueTemp((prev) => ({ ...prev, checkbox: val }));
            }}
            value={valueTemp.checkbox || []}
          >
            <Row style={{ maxWidth: 250 }} align='middle' gutter={[0, 8]}>
              {options.map((o, idx) => (
                <Col span={24} key={o.value?.toString() || `key-${idx}`}>
                  <Checkbox style={{ width: '100%' }} value={o.value}>
                    {o.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </React.Fragment>
      );
    return null;
  };
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Radio.Group
        onChange={(e) => {
          setValueTemp((prev) => ({ ...prev, radio: e.target.value }));
        }}
        value={valueTemp?.radio}
      >
        <Row align='middle' gutter={[0, 8]}>
          {optionsRadio?.map((o, idx) => (
            <Col span={24} key={o.value?.toString() || `key-${idx}`}>
              <Radio style={{ width: '100%' }} value={o.value}>
                {o.label}
              </Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>
      {optionsCheckbox ? renderCheckBox() : null}
    </div>
  );

  return (
    <FilterOrigin
      {...props}
      value={{ radio: valueRadio, checkbox: valueCheckbox }}
      content={content}
      valueTemp={valueTemp}
      clearFilter={() => {
        setValueTemp({ radio: null, checkbox: [] });
      }}
      setValueTemp={setValueTemp}
    />
  );
};

export default FilterCheckboxRadio;
