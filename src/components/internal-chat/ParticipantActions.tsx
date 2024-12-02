import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ArrowUpOutlined, MinusCircleOutline, ThreeDots } from 'assets';
import { internalChatMessages } from 'messages';
import { ConversationParticiPantDto } from 'types';

type ParticipantActionProps = {
  user: ConversationParticiPantDto;
  isLoading?: boolean;
  onDelete?: (data: ConversationParticiPantDto) => void;
  onPromote?: (data: ConversationParticiPantDto) => void;
};
const ParticipantActions = ({ user, isLoading, onDelete, onPromote }: ParticipantActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'promote',
      label: internalChatMessages.promote,
      icon: <ArrowUpOutlined />,
      className: 'flex gap-x-2',
      disabled: isLoading
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: internalChatMessages.deleteParticipant,
      icon: <MinusCircleOutline />,
      className: 'flex gap-x-2',
      disabled: isLoading
    },
    {
      type: 'divider'
    }
  ];

  const onClickActionItem = (action: string, data: ConversationParticiPantDto) => {
    switch (action) {
      case 'promote':
        onPromote?.(data);
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
        placement='bottomRight'
        menu={{
          items: actionItems,
          onClick: ({ key }) => {
            onClickActionItem(key, user);
          }
        }}
      >
        <Button size='small' type='text'>
          <ThreeDots />
        </Button>
      </Dropdown>
    </>
  );
};

export default ParticipantActions;
