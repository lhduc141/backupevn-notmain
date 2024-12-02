import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { OrganizationUnitDto } from 'types';

type OrganizationUnitActionProps = {
  organizationUnit: OrganizationUnitDto;
  onDelete?: (organizationUnit: OrganizationUnitDto) => void;
  onUpdateInfo?: (organizationUnit: OrganizationUnitDto) => void;
};
const OrganizationUnitActions = ({ organizationUnit, onDelete, onUpdateInfo }: OrganizationUnitActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: messages.updateInfo
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      danger: true,
      label: messages.deleteButtonText
    }
  ];

  const onClickActionItem = (action: string, data: OrganizationUnitDto) => {
    switch (action) {
      case 'delete':
        onDelete?.(data);
        break;
      case 'updateInfo':
        onUpdateInfo?.(data);
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
            onClickActionItem(key, organizationUnit);
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

export default OrganizationUnitActions;
