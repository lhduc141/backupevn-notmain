import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages, userGroupsMessages } from 'messages';
import { UserGroupDto } from 'types';

type UserGroupActionProps = {
  userGroup: UserGroupDto;
  onUpdateInfo?: (data: UserGroupDto) => void;
  onUpdateUsers?: (data: UserGroupDto) => void;
  onUpdatePermissions?: (data: UserGroupDto) => void;
};
const UserGroupActions = ({ userGroup, onUpdateInfo, onUpdatePermissions, onUpdateUsers }: UserGroupActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: messages.updateInfo
    },
    {
      type: 'divider'
    },
    {
      key: 'updateUsers',
      label: userGroupsMessages.updateUsers
    },
    {
      type: 'divider'
    },
    {
      key: 'permission',
      label: userGroupsMessages.permissions
    }
  ];

  const onClickActionItem = (action: string, data: UserGroupDto) => {
    switch (action) {
      case 'updateInfo':
        onUpdateInfo?.(data);
        break;
      case 'permission':
        onUpdatePermissions?.(data);
        break;
      case 'updateUsers':
        onUpdateUsers?.(data);
        break;
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: actionItems,
        onClick: ({ key }) => {
          onClickActionItem(key, userGroup);
        }
      }}
      openClassName='border-colorPrimaryActive'
    >
      <Button type='text' shape='circle'>
        <ThreeDots />
      </Button>
    </Dropdown>
  );
};

export default UserGroupActions;
