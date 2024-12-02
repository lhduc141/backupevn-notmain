import { Modal } from 'components/common';
import { internalChatMessages } from 'messages';
import { MessageDto } from 'types';
import InternalChatForwardGroupAndUserList from './InternalChatForwardGroupAndUserList';

type InternalChatForwardMessageModalProps = {
  open: boolean;
  onCancel: () => void;
  message: MessageDto;
};

const InternalChatForwardMessageModal: React.FC<InternalChatForwardMessageModalProps> = ({
  open,
  onCancel,
  message
}) => {
  return (
    <Modal.Small
      title={internalChatMessages.forward}
      open={open}
      onCancel={onCancel}
      centered
      destroyOnClose
      footer={null}
      width={568}
    >
      <InternalChatForwardGroupAndUserList message={message} />
    </Modal.Small>
  );
};

export default InternalChatForwardMessageModal;
