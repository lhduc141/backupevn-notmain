import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { TicketSampleDto } from 'types';

type TicketSampleActionProps = {
  ticketSample: TicketSampleDto;
  onDelete?: (ticketSample: TicketSampleDto) => void;
  onUpdateStatus?: (ticketSample: TicketSampleDto) => void;
};

const TicketSampleActions = ({ ticketSample, onDelete, onUpdateStatus }: TicketSampleActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateStatus',
      label: messages.updateStatus
    },
    {
      key: 'delete',
      danger: true,
      label: messages.deleteButtonText
    }
  ];

  const onClickActionItem = (action: string, data: TicketSampleDto) => {
    switch (action) {
      case 'updateStatus':
        onUpdateStatus?.(data);
        break;
      case 'delete':
        onDelete?.(data);
        break;
    }
  };

  return (
    <>
      <Dropdown
        trigger={['click']}
        menu={{
          items: actionItems,
          onClick: ({ key }) => {
            onClickActionItem(key, ticketSample);
          }
        }}
      >
        <Button type='text' shape='circle'>
          <ThreeDots />
        </Button>
      </Dropdown>
    </>
  );
};

export default TicketSampleActions;
