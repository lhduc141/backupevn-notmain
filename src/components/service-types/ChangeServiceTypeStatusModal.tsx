import { ModalProps } from 'antd';
import { useGetServiceTypeDetailQuery, useUpdateServiceTypeMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeServiceTypeStatusModalProps = ModalProps & {
  serviceTypeId: number;
  onClose?: () => void;
};

const ChangeServiceTypeStatusModal = ({ serviceTypeId, onClose, ...props }: ChangeServiceTypeStatusModalProps) => {
  const { isLoading, data } = useGetServiceTypeDetailQuery(serviceTypeId);
  const [updateServiceType, { isLoading: isLoadingUpdate }] = useUpdateServiceTypeMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateServiceType({ serviceTypeId: serviceTypeId, isActive: status })
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

export default ChangeServiceTypeStatusModal;
