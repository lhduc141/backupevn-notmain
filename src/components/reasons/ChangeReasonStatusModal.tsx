import { ModalProps } from 'antd';
import { useGetReasonDetailQuery, useUpdateReasonMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeReasonStatusModalProps = ModalProps & {
  reasonId: number;
  onClose?: () => void;
};

const ChangeReasonStatusModal = ({ reasonId, onClose, ...props }: ChangeReasonStatusModalProps) => {
  const { isLoading, data } = useGetReasonDetailQuery(reasonId);
  const [updateReason, { isLoading: isLoadingUpdate }] = useUpdateReasonMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateReason({ reasonId: reasonId, isActive: status })
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

export default ChangeReasonStatusModal;
