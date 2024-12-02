import { ModalProps } from 'antd';
import { useGetCustomerSupportInformationDetailQuery, useUpdateCustomerSupportInformationMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeCustomerSupportInformationStatusModalProps = ModalProps & {
  customerSupportInformationId: number;
  onClose?: () => void;
};

const ChangeCustomerSupportInformationStatusModal = ({
  customerSupportInformationId,
  onClose,
  ...props
}: ChangeCustomerSupportInformationStatusModalProps) => {
  const { isLoading, data } = useGetCustomerSupportInformationDetailQuery(customerSupportInformationId);
  const [updateCustomerSupportInformation, { isLoading: isLoadingUpdate }] =
    useUpdateCustomerSupportInformationMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateCustomerSupportInformation({ customerSupportInformationId: customerSupportInformationId, isActive: status })
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
        onClose?.();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ChangeCommonStatusModal
      {...props}
      onSubmit={handleUpdateStatus}
      loading={isLoading || isLoadingUpdate}
      value={data?.data.isActive}
    />
  );
};

export default ChangeCustomerSupportInformationStatusModal;
