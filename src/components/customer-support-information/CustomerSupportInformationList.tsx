import { Skeleton, Spin, Tag } from 'antd';
import { InfoOutlinedIcon } from 'assets';
import { Avatar, MenuItem, message } from 'components';
import { useCustomerSupportInformationActive } from 'hooks/customer-support-information';
import { customerSupportInformationMessages } from 'messages';
import { useState } from 'react';
import CustomerSupportInformationDetail from './CustomerSupportInformationDetail';
import { CUSTOMER_SUPPORT_INFORMATION_FORMAT, isValidUrl } from 'utils';
import { useLazyGetCustomerSupportInformationDetailQuery } from 'services';
import { CustomerSupportInformationDto } from 'types';

type CustomerSupportInformationListProps = {
  handleCollapsed: () => void;
  handleOnSelectItem: (item: Omit<CustomerSupportInformationDto, 'content'>) => void;
};

const CustomerSupportInformationList = ({
  handleCollapsed,
  handleOnSelectItem
}: CustomerSupportInformationListProps) => {
  const { data, isLoading } = useCustomerSupportInformationActive();
  const [fetchDetailCustomerSupport, { isLoading: isLoadingDetail }] =
    useLazyGetCustomerSupportInformationDetailQuery();

  const openNewTabSupportLink = (itm: Omit<CustomerSupportInformationDto, 'content'>) => {
    fetchDetailCustomerSupport(itm.customerSupportInformationId).then((rs) => {
      if (rs.data?.data.content && isValidUrl(rs.data?.data.content)) {
        window.open(rs.data?.data.content, '_blank', 'noopener,noreferrer');
      } else {
        message.systemError(customerSupportInformationMessages.invalidUrl);
      }
    });
  };
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      {isLoading ? (
        <Skeleton title={false} paragraph={{ rows: 5 }} />
      ) : (
        <Spin spinning={isLoadingDetail}>
          {data?.map((itm) => (
            <MenuItem
              onClick={async () => {
                handleCollapsed();
                await delay(250);
                if (itm.format && itm.format.optionId === CUSTOMER_SUPPORT_INFORMATION_FORMAT.LINK) {
                  openNewTabSupportLink(itm);
                  return;
                }
                handleOnSelectItem(itm);
              }}
              item={{
                key: itm.customerSupportInformationId.toString(),
                label: itm.title
              }}
              icon={
                <Avatar
                  size={24}
                  src={<InfoOutlinedIcon />}
                  className='rounded-md bg-transparent object-contain'
                  shape='square'
                  fileId={itm.icon}
                />
              }
              className='px-4'
              suffix={itm.isNew && <Tag>{customerSupportInformationMessages.isNew}</Tag>}
            />
          ))}
        </Spin>
      )}
    </>
  );
};
export default CustomerSupportInformationList;
