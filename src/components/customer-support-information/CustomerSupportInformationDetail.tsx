import { Skeleton, Typography } from 'antd';
import CustomerSupportInformationExcel from './CustomerSupportInformationExcel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'components/common';
import { useGetCustomerSupportInformationActiveDetailQuery } from 'services';
import { calculateColumnWidths, CUSTOMER_SUPPORT_INFORMATION_FORMAT } from 'utils';

type CustomerSupportInformationDetailProps = {
  customerSupportInformationId?: number;
  open: boolean;
  onCancel: () => void;
};

const CustomerSupportInformationDetail = ({
  onCancel,
  open,
  customerSupportInformationId
}: CustomerSupportInformationDetailProps) => {
  const [width, setWidth] = useState(1032);
  const { data: customerSupportInformation, isLoading } = useGetCustomerSupportInformationActiveDetailQuery(
    customerSupportInformationId!,
    {
      skip: !customerSupportInformationId,
      refetchOnMountOrArgChange: true
    }
  );
  useEffect(() => {
    if (!open) setWidth(1032);
  }, [open]);

  const onGetDataExcel = (data: (string | number)[][]) => {
    const calculateData = calculateColumnWidths(data, 1032);
    const totalWidth = calculateData.totalWidth + 48;
    const maxWidth = window.innerWidth - 80;
    const width = Math.min(totalWidth, maxWidth ?? 9999);
    if (width) {
      setWidth(width);
    } else {
      setWidth(totalWidth);
    }
  };

  const renderContent = () => {
    if (
      customerSupportInformation?.data &&
      customerSupportInformation.data.customerSupportInformationId === customerSupportInformationId
    ) {
      switch (customerSupportInformation?.data.formatId) {
        case CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE:
          return (
            <CustomerSupportInformationExcel
              minWidth={1032}
              maxWidth={window.innerWidth - 128}
              height={window.innerHeight - 124}
              customerSupportInformationId={customerSupportInformationId}
              onLoadData={(data) => onGetDataExcel(data)}
            />
          );
        case CUSTOMER_SUPPORT_INFORMATION_FORMAT.TEXT:
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: customerSupportInformation.data.content
              }}
            />
          );
        default:
          return (
            <Link to={customerSupportInformation?.data.content} target='_blank'>
              <Typography.Link>{customerSupportInformation?.data.content}</Typography.Link>
            </Link>
          );
      }
    }
    return null;
  };
  return (
    <Modal.Small
      width={
        customerSupportInformation?.data.formatId === CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE ? width : 768
      }
      destroyOnClose
      centered
      onCancel={onCancel}
      open={open}
      title={customerSupportInformation?.data.title}
      footer={null}
      styles={{
        body: {
          padding:
            customerSupportInformation?.data.formatId === CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE
              ? '0 24px 20px 24px'
              : 24,
          minHeight: 'calc(100vh - 156px)'
        }
      }}
    >
      {isLoading ? <Skeleton title={false} paragraph={{ rows: 5 }} /> : <>{renderContent()}</>}
    </Modal.Small>
  );
};
export default CustomerSupportInformationDetail;
