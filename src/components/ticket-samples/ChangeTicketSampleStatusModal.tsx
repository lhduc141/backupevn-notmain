import { ModalProps } from 'antd';
import { useGetTicketSampleDetailQuery, useUpdateTicketSampleMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeTicketSampleStatusModalProps = ModalProps & {
  ticketSampleId: number;
  onClose?: () => void;
};

const ChangeTicketSampleStatusModal = ({ ticketSampleId, onClose, ...props }: ChangeTicketSampleStatusModalProps) => {
  const { isLoading, data } = useGetTicketSampleDetailQuery(ticketSampleId);
  const [updateTicketSample, { isLoading: isLoadingUpdate }] = useUpdateTicketSampleMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateTicketSample({ ticketSampleId: ticketSampleId, isActive: status })
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

export default ChangeTicketSampleStatusModal;
