import { Col, Radio, RadioProps, Row, Spin } from 'antd';
import { useOptions } from 'hooks';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FindAllOptionsDto } from 'types';

type RadioOptionsProps = RadioProps &
  Pick<FindAllOptionsDto, 'optionTypeId' | 'service'> & {
    title?: string;
    icon?: React.JSX.Element;
    cols?: number;
  };

const RadioOptions = ({ optionTypeId, service, title, cols = 2, ...props }: RadioOptionsProps) => {
  const { data, isLoading } = useOptions({
    optionTypeId,
    service
  });

  return (
    <Spin spinning={isLoading}>
      <Radio.Group {...props} className={twMerge('w-full', props.className)}>
        <Row gutter={[24, 0]}>
          {data.map((item) => (
            <Col className='py-3' span={24 / cols} key={item.optionId}>
              <Radio value={item.optionId}>{item.name}</Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </Spin>
  );
};
export default RadioOptions;
