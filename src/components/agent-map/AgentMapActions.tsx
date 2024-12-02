import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { AgentMapDto } from 'types';

type AgentMapActionsProps = {
  agentMap: AgentMapDto;
  onUpdateInfo?: (agentMap: AgentMapDto) => void;
  onUpdateStatus?: (agentMap: AgentMapDto) => void;
  onDelete?: (agentMap: AgentMapDto) => void;
};

const AgentMapActions = ({ agentMap, onUpdateInfo, onUpdateStatus, onDelete }: AgentMapActionsProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: messages.updateInfo
    },
    {
      type: 'divider'
    },
    {
      key: 'updateStatus',
      label: messages.updateStatus
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: messages.deleteButtonText,
      danger: true
    }
  ];

  const onClickActionItem = (action: string, data: AgentMapDto) => {
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
    <>
      <Dropdown
        trigger={['click']}
        menu={{
          items: actionItems,
          onClick: ({ key }) => {
            onClickActionItem(key, agentMap);
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

export default AgentMapActions;
