import { Button, Form, Input, Modal } from 'antd';
import { FormItem } from 'components/common';
import { validateMessages } from 'messages';
import { agentMapsMessages } from 'messages/agent-maps.messages';
import { forwardRef, useImperativeHandle } from 'react';
import { CreateAgentMapSeatDto } from 'types';
import { FabricAgentMapSeat } from 'types/fabric-agent-map';

type AgentMapModalInfoSeatProps = {
  open: boolean;
  onCancel: () => void;
  existingSeats?: FabricAgentMapSeat[];
  handleSubmit: (value: AgentMapFormInfoSeatType) => void;
};

export type AgentMapFormInfoSeatType = Pick<CreateAgentMapSeatDto, 'seatName' | 'seatIp'> & {
  id: string | number;
};

export type AgentMapModalInfoSeatRef = {
  setFieldsValue: (value: AgentMapFormInfoSeatType) => void;
};

const AgentMapModalInfoSeat = forwardRef<AgentMapModalInfoSeatRef, AgentMapModalInfoSeatProps>(
  ({ open, onCancel, existingSeats = [], handleSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
      setFieldsValue
    }));
    const [form] = Form.useForm<AgentMapFormInfoSeatType>();
    const seatName = Form.useWatch('seatName', form);

    const setFieldsValue = (values: AgentMapFormInfoSeatType) => {
      form.setFieldsValue(values);
    };

    const onSubmit = (values: AgentMapFormInfoSeatType) => {
      const { seatIp, seatName, id } = values;
      const currentSeats = existingSeats.filter((o) => o.id !== id);

      if (currentSeats.map((o) => o.seatIp).includes(seatIp)) {
        form.setFields([
          {
            name: 'seatIp',
            errors: [agentMapsMessages.seatIpDuplicate]
          }
        ]);
        return;
      }
      // if (currentSeats.map((o) => o.seatName).includes(seatName)) {
      //   form.setFields([
      //     {
      //       name: 'seatName',
      //       errors: [agentMapsMessages.seatNameDuplicate]
      //     }
      //   ]);
      //   return;
      // }
      handleSubmit(values);
    };

    return (
      <Modal
        width={568}
        title={agentMapsMessages.seatNameTitle(seatName)}
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
          <Form.Item<AgentMapFormInfoSeatType> noStyle name='id' />
          <Form.Item<AgentMapFormInfoSeatType> noStyle name='seatName' />

          <FormItem.FloatLabel<AgentMapFormInfoSeatType>
            label={agentMapsMessages.seatIp}
            name='seatIp'
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem.FloatLabel>
        </Form>
      </Modal>
    );
  }
);

export default AgentMapModalInfoSeat;
