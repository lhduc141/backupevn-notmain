import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { ShiftDto } from 'types';

type ShiftActionsProps = {
  shift: ShiftDto;
  onDelete?: (shift: ShiftDto) => void;
  onUpdateStatus?: (shift: ShiftDto) => void;
  onUpdateInfo?: (shift: ShiftDto) => void;
};

const ShiftActions = ({ shift, onDelete, onUpdateStatus, onUpdateInfo }: ShiftActionsProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: messages.updateInfo
    },
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

  const onClickActionItem = (action: string, data: ShiftDto) => {
    switch (action) {
      case 'updateInfo':
        onUpdateInfo?.(data);
        break;
      case 'updateStatus':
        onUpdateStatus?.(data);
        break;
      case 'delete':
        onDelete?.(data);
        break;
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: actionItems,
        onClick: ({ key }) => {
          onClickActionItem(key, shift);
        }
      }}
    >
      <Button type='text' shape='circle'>
        <ThreeDots />
      </Button>
    </Dropdown>
  );
};

export default ShiftActions;
