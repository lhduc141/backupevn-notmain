import { ModalProps } from 'antd';
import { useGetShiftDetailQuery, useUpdateShiftMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeShiftStatusModalProps = ModalProps & {
  shiftId: number;
  onClose?: () => void;
};

const ChangeShiftStatusModal = ({ shiftId, onClose, ...props }: ChangeShiftStatusModalProps) => {
  const { isLoading, data } = useGetShiftDetailQuery(shiftId);
  const [updateShift, { isLoading: isLoadingUpdate }] = useUpdateShiftMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateShift({ shiftId: shiftId, isActive: status })
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

export default ChangeShiftStatusModal;
