import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { TicketCancelReasonDto } from 'types';

type TicketCancelReasonActionProps = {
  ticketCancelReason: TicketCancelReasonDto;
  onDelete?: (ticketCancelReason: TicketCancelReasonDto) => void;
  onUpdateStatus?: (ticketCancelReason: TicketCancelReasonDto) => void;
};

const TicketCancelReasonActions = ({ ticketCancelReason, onDelete, onUpdateStatus }: TicketCancelReasonActionProps) => {
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

  const onClickActionItem = (action: string, data: TicketCancelReasonDto) => {
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
            onClickActionItem(key, ticketCancelReason);
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

export default TicketCancelReasonActions;
