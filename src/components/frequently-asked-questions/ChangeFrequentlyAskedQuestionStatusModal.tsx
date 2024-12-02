import { ModalProps } from 'antd';
import { useGetFrequentlyAskedQuestionDetailQuery, useUpdateFrequentlyAskedQuestionMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeFrequentlyAskedQuestionStatusModalProps = ModalProps & {
  frequentlyAskedQuestionId: number;
  onClose?: () => void;
};

const ChangeFrequentlyAskedQuestionStatusModal = ({
  frequentlyAskedQuestionId,
  onClose,
  ...props
}: ChangeFrequentlyAskedQuestionStatusModalProps) => {
  const { isLoading, data } = useGetFrequentlyAskedQuestionDetailQuery(frequentlyAskedQuestionId);
  const [updateFrequentlyAskedQuestion, { isLoading: isLoadingUpdate }] = useUpdateFrequentlyAskedQuestionMutation();

  const handleUpdateStatus = (status: boolean) => {
    updateFrequentlyAskedQuestion({ frequentlyAskedQuestionId: frequentlyAskedQuestionId, isActive: status })
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

export default ChangeFrequentlyAskedQuestionStatusModal;
