import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { ServiceTypeHierarchyDto } from 'types';

type ServiceTypeActionProps = {
  serviceType: ServiceTypeHierarchyDto;
  onDelete?: (serviceType: ServiceTypeHierarchyDto) => void;
  onUpdateStatus?: (serviceType: ServiceTypeHierarchyDto) => void;
};
const ServiceTypeActions = ({ serviceType, onDelete, onUpdateStatus }: ServiceTypeActionProps) => {
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

  const onClickActionItem = (action: string, data: ServiceTypeHierarchyDto) => {
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
            onClickActionItem(key, serviceType);
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

export default ServiceTypeActions;
