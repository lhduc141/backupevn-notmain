import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { VipCustomerDto } from 'types';

type VipCustomerActionProps = {
  vipCustomer: VipCustomerDto;
  onDelete?: (vipCustomer: VipCustomerDto) => void;
};

const VipCustomerActions = ({ vipCustomer, onDelete }: VipCustomerActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'delete',
      danger: true,
      label: messages.deleteButtonText
    }
  ];

  const onClickActionItem = (action: string, data: VipCustomerDto) => {
    switch (action) {
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
            onClickActionItem(key, vipCustomer);
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

export default VipCustomerActions;
