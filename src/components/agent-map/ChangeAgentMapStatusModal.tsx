import { ModalProps } from 'antd';
import { useGetAgentMapDetailQuery, useUpdateAgentMapMutation } from 'services';
import { ChangeCommonStatusModal, message } from 'components/common';

type ChangeAgentMapStatusModalProps = ModalProps & {
  agentMapId: number;
  onClose?: () => void;
};

const ChangeAgentMapStatusModal = ({ agentMapId, onClose, ...props }: ChangeAgentMapStatusModalProps) => {
  const { isLoading, data } = useGetAgentMapDetailQuery(agentMapId);
  const [updateAgentMap, { isLoading: isLoadingUpdate }] = useUpdateAgentMapMutation();

  const handleUpdateStatus = (isActive: boolean) => {
    updateAgentMap({ agentMapId: agentMapId, isActive: isActive })
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

export default ChangeAgentMapStatusModal;
