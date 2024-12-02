import { Descriptions, Divider, DrawerProps, Typography } from 'antd';
import { Avatar, CommonStatus, Drawer } from 'components/common';
import { customerSupportInformationMessages, messages } from 'messages';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCustomerSupportInformationDetailQuery } from 'services';
import { twMerge } from 'tailwind-merge';
import { CUSTOMER_SUPPORT_INFORMATION_FORMAT } from 'utils';
import CustomerSupportInformationExcel from './CustomerSupportInformationExcel';
import CustomerSupportInformationActions from './CustomerSupportInformationActions';
import ChangeCustomerSupportInformationStatusModal from './ChangeCustomerSupportInformationStatusModal';

type CustomerSupportInformationDrawerProps = DrawerProps & {
  customerSupportInformationId?: number;
  onChangeLoading?: (value: boolean) => void;
};

const CustomerSupportInformationDrawer = ({
  customerSupportInformationId,
  onChangeLoading,
  ...props
}: CustomerSupportInformationDrawerProps) => {
  const [openStatus, setOpenStatus] = useState(false);

  const {
    data,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail
  } = useGetCustomerSupportInformationDetailQuery(customerSupportInformationId!, {
    skip: !customerSupportInformationId,
    refetchOnMountOrArgChange: true
  });
  const customerSupportInformation = data?.data;
  const isLoading = isFetchingDetail || isLoadingDetail;

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoading);
    }
  }, [onChangeLoading, isLoading]);

  const descriptionItem = [
    {
      key: 'title',
      label: customerSupportInformationMessages.title,
      children: customerSupportInformation?.title
    },
    {
      key: 'icon',
      label: customerSupportInformationMessages.icon,
      children: (
        <div className='flex h-6 w-6 items-center justify-center rounded-base bg-backgroundColor3'>
          <Avatar
            className='rounded-none border-none bg-none object-contain'
            size={16}
            fileId={customerSupportInformation?.icon}
            shape='square'
          />
        </div>
      )
    },
    {
      key: 'status',
      label: messages.status,
      children: customerSupportInformation && (
        <CommonStatus textClassname='text-base' value={customerSupportInformation?.isActive} />
      )
    }
  ];

  const renderContent = () => {
    if (
      customerSupportInformation &&
      customerSupportInformation.customerSupportInformationId === customerSupportInformationId
    ) {
      switch (customerSupportInformation.formatId) {
        case CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE:
          return (
            <CustomerSupportInformationExcel
              minWidth={632}
              maxWidth={632}
              height={window.innerHeight - 144}
              searchClassName='w-[400px] bg-colorBgSmallModal'
              customerSupportInformationId={customerSupportInformationId}
            />
          );
        case CUSTOMER_SUPPORT_INFORMATION_FORMAT.TEXT:
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: customerSupportInformation.content
              }}
            />
          );
        default:
          return (
            <Link to={customerSupportInformation.content} target='_blank'>
              <Typography.Link className='text-mainColor1'>{customerSupportInformation?.content}</Typography.Link>
            </Link>
          );
      }
    }
    return null;
  };
  const handleOpenStatusModal = () => {
    setOpenStatus(true);
  };

  return (
    <Drawer
      {...props}
      width={680}
      title={''}
      extra={
        <div>
          {customerSupportInformation && (
            <CustomerSupportInformationActions
              customerSupportInformation={customerSupportInformation}
              onUpdateStatus={handleOpenStatusModal}
            />
          )}
        </div>
      }
      loading={isLoading}
    >
      <div className={twMerge('min-h-9 w-full', isLoading && !customerSupportInformation && 'skeleton-active')}>
        <Typography.Title className='text-2.5xl'>{customerSupportInformation?.title}</Typography.Title>
      </div>
      <div
        className={twMerge('mt-8 min-h-[124px] w-full', isLoading && !customerSupportInformation && 'skeleton-active')}
      >
        <Typography.Title className='mb-4 text-lg'>{messages.general}</Typography.Title>
        <Descriptions items={descriptionItem} column={1} labelStyle={{ minWidth: 140 }} />
      </div>
      <Divider className='mb-8 mt-2' />
      <div className='pb-5'>
        <Typography.Title className='mb-4 text-lg'>{customerSupportInformationMessages.content}</Typography.Title>
        {renderContent()}
      </div>
      {customerSupportInformation && (
        <ChangeCustomerSupportInformationStatusModal
          customerSupportInformationId={customerSupportInformation.customerSupportInformationId}
          open={openStatus}
          onCancel={() => setOpenStatus(false)}
          onClose={() => setOpenStatus(false)}
        />
      )}
    </Drawer>
  );
};

export default CustomerSupportInformationDrawer;
