import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { usersMessages } from 'messages';
import { UserDto } from 'types';

type UserActionProps = {
  user: UserDto;
  onUpdateInfo?: (user: UserDto) => void;
  onUpdateStatus?: (user: UserDto) => void;
  onUpdatePassword?: (user: UserDto) => void;
  onDelete?: (user: UserDto) => void;
  onUpdatePermission?: (user: UserDto) => void;
};
const UserActions = ({
  user,
  onDelete,
  onUpdateInfo,
  onUpdatePassword,
  onUpdatePermission,
  onUpdateStatus
}: UserActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: usersMessages.updateInfo
    },
    {
      type: 'divider'
    },
    {
      key: 'permission',
      label: usersMessages.permissions
    },
    {
      type: 'divider'
    },
    {
      key: 'changePassword',
      label: usersMessages.changePassword
    },
    {
      type: 'divider'
    },
    {
      key: 'updateStatus',
      label: usersMessages.updateStatus
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: usersMessages.delete
    }
  ];

  const onClickActionItem = (action: string, data: UserDto) => {
    switch (action) {
      case 'permission':
        onUpdatePermission?.(data);
        break;
      case 'updateInfo':
        onUpdateInfo?.(data);
        break;
      case 'delete':
        onDelete?.(data);
        break;
      case 'updateStatus':
        onUpdateStatus?.(data);
        break;
      case 'changePassword':
        onUpdatePassword?.(data);
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
            onClickActionItem(key, user);
          }
        }}
        openClassName='border-colorPrimaryActive'
      >
        <Button type='text' shape='circle'>
          <ThreeDots />
        </Button>
      </Dropdown>
    </>
  );
};

export default UserActions;
