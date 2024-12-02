import { Button, Form, ModalProps } from 'antd';
import { useEffect } from 'react';
import { messages } from 'messages';
import { Rule } from 'antd/es/form';
import { Modal, RadioGroup } from 'components';
import Icon from '@ant-design/icons';
import { CheckCircleIcon, RestrictedIcon } from 'assets';

type ChangeStatusModalProps = ModalProps & {
  value?: boolean;
  onSubmit: (status: boolean) => void;
  rules?: Rule[];
  loading?: boolean;
};

const STATUS_OPTIONS = [
  {
    label: messages.statusEnum.active,
    value: true,
    icon: <Icon className='text-[32px]' component={CheckCircleIcon} />
  },
  {
    label: messages.statusEnum.inactive,
    value: false,
    icon: <Icon className='text-[32px]' component={RestrictedIcon} />
  }
];

const ChangeStatusModal = ({ onSubmit, value, rules, loading, ...props }: ChangeStatusModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.open) {
      form.setFieldValue('status', value);
    }
  }, [props.open, value]);

  return (
    <Modal.Headless
      {...props}
      title={messages.updateStatus}
      maskClosable={false}
      centered
      destroyOnClose
      footer={[
        <Button
          key='btn-submit'
          loading={loading}
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
        <Form
          form={form}
          onFinish={({ status }) => {
            onSubmit(status);
          }}
        >
          <Form.Item name='status' rules={rules}>
            <RadioGroup className='bg-white' options={STATUS_OPTIONS} />
          </Form.Item>
        </Form>
      </div>
    </Modal.Headless>
  );
};

export default ChangeStatusModal;
