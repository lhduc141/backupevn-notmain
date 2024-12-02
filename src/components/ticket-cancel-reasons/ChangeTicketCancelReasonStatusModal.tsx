import { ModalProps } from 'antd';
import { useGetTicketCancelReasonDetailQuery, useUpdateTicketCancelReasonMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeTicketCancelReasonStatusModalProps = ModalProps & {
  ticketCancelReasonId: number;
  onClose?: () => void;
};

const ChangeTicketCancelReasonStatusModal = ({
  ticketCancelReasonId,
  onClose,
  ...props
}: ChangeTicketCancelReasonStatusModalProps) => {
  const { isLoading, data } = useGetTicketCancelReasonDetailQuery(ticketCancelReasonId);
  const [updateTicketCancelReason, { isLoading: isLoadingUpdate }] = useUpdateTicketCancelReasonMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateTicketCancelReason({ ticketCancelReasonId: ticketCancelReasonId, isActive: status })
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

export default ChangeTicketCancelReasonStatusModal;
