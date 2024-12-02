import { Button, Modal, ModalProps, Form } from 'antd';
import { useEffect } from 'react';
import { messages } from 'messages';
import { Rule } from 'antd/es/form';
import { OptionCompactDto } from 'types';
import Icon from '@ant-design/icons';
import { CheckCircleIcon, RestrictedIcon } from 'assets';
import { RadioGroup } from 'components';
import { useOptions } from 'hooks';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';

type ChangeOptionStatusModalProps = ModalProps & {
  optionTypeId: AUTH_OPTION_TYPES;
  service: MICROSERVICES;
  value?: number;
  onSubmit: (statusId: number) => void;
  rules?: Rule[];
  loading?: boolean;
};

const ChangeOptionStatusModal = ({
  optionTypeId,
  service,
  value,
  onSubmit,
  rules,
  loading,
  ...props
}: ChangeOptionStatusModalProps) => {
  const { isLoading, data } = useOptions({
    optionTypeId: optionTypeId,
    service: service
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (props.open) {
      form.setFieldValue('statusId', value);
    }
  }, [props.open]);

  const renderIcon = (optionCode: string) => {
    switch (optionCode) {
      case 'ACTIVE':
        return CheckCircleIcon;
      case 'INACTIVE':
        return RestrictedIcon;
      default:
        return undefined;
    }
  };

  const formatStatusOptions = (options: OptionCompactDto[]) => {
    return options.map((option) => ({
      label: option.name,
      value: option.optionId,
      icon: <Icon className='text-[32px]' component={renderIcon(option.code)} />
    }));
  };

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      destroyOnClose
      footer={[
        <Button
          key='btn-submit'
          loading={isLoading || loading}
          onClick={() => {
            form.submit();
          }}
          size='large'
          type='primary'
        >
          {messages.saveButtonText}
        </Button>
      ]}
    >
      <div className='mt-10'>
        <Form form={form} onFinish={({ statusId }) => onSubmit(statusId)}>
          <Form.Item name='statusId' rules={rules}>
            <RadioGroup className='bg-white' options={formatStatusOptions(data)} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangeOptionStatusModal;
