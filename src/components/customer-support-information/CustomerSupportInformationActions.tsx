import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { CustomerSupportInformationDto } from 'types';

type CustomerSupportInformationActionsProps = {
  customerSupportInformation: CustomerSupportInformationDto;
  onUpdateStatus?: (customerSupportInformation: CustomerSupportInformationDto) => void;
};

const CustomerSupportInformationActions = ({
  customerSupportInformation,
  onUpdateStatus
}: CustomerSupportInformationActionsProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: (
        <Link
          to={`${ROUTE.CUSTOMER_SUPPORT_INFORMATION}/${customerSupportInformation.customerSupportInformationId}`}
          className='no-underline'
        >
          {messages.updateInfo}
        </Link>
      )
    },
    {
      key: 'updateStatus',
      label: messages.updateStatus
    }
  ];

  const onClickActionItem = (action: string, data: CustomerSupportInformationDto) => {
    switch (action) {
      case 'updateStatus':
        onUpdateStatus?.(data);
        break;
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: actionItems,
        onClick: ({ key }) => {
          onClickActionItem(key, customerSupportInformation);
        }
      }}
    >
      <Button type='text' shape='circle'>
        <ThreeDots />
      </Button>
    </Dropdown>
  );
};

export default CustomerSupportInformationActions;
