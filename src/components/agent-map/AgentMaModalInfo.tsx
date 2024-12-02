import { Button, Form, Input, Modal } from 'antd';
import { FormItem } from 'components/common';
import { validateMessages } from 'messages';
import { agentMapsMessages } from 'messages/agent-maps.messages';
import { forwardRef, useImperativeHandle } from 'react';
import { CreateAgentMapDto } from 'types';

type AgentMapModalInfoProps = {
  open: boolean;
  onCancel: () => void;
  handleSubmit: (value: AgentMapFormInfoType) => void;
};

export type AgentMapFormInfoType = Pick<CreateAgentMapDto, 'name'>;

export type AgentMapModalInfoRef = {
  setFieldsValue: (value: AgentMapFormInfoType) => void;
};

const AgentMapModalInfo = forwardRef<AgentMapModalInfoRef, AgentMapModalInfoProps>(
  ({ open, onCancel, handleSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
      setFieldsValue
    }));
    const [form] = Form.useForm<AgentMapFormInfoType>();

    const setFieldsValue = (values: AgentMapFormInfoType) => {
      form.setFieldsValue(values);
    };

    const onSubmit = (values: AgentMapFormInfoType) => {
      handleSubmit(values);
    };

    return (
      <Modal
        width={568}
        title={agentMapsMessages.mapName}
        open={open}
        onCancel={onCancel}
        footer={
          <Button
            onClick={() => {
              form.submit();
            }}
            type='primary'
          >
            {agentMapsMessages.save}
          </Button>
        }
      >
        <Form
          labelAlign='right'
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          onFinish={onSubmit}
          labelCol={{
            flex: '180px'
          }}
          validateMessages={validateMessages}
        >
          <FormItem.FloatLabel<AgentMapFormInfoType>
            label={agentMapsMessages.mapName}
            name='name'
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem.FloatLabel>
        </Form>
      </Modal>
    );
  }
);

export default AgentMapModalInfo;
