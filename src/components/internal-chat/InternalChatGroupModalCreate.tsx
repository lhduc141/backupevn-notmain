import { Button, ModalProps } from 'antd';
import { Modal } from 'components/common';
import { internalChatMessages } from 'messages';
import { useRef, useState } from 'react';
import { ConversationDto } from 'types';
import InternalChatGroupFormCreate, { InternalChatGroupFormCreateRefProps } from './InternalChatGroupFormCreate';

type InternalChatGroupModalCreateProps = ModalProps & {
  onCancel: () => void;
  onCreateSuccess?: (conversation: ConversationDto) => void;
};

const InternalChatGroupModalCreate: React.FC<InternalChatGroupModalCreateProps> = ({
  onCancel,
  onCreateSuccess,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const createFormRef = useRef<InternalChatGroupFormCreateRefProps>(null);
  return (
    <Modal.Small
      {...props}
      width={568}
      title={internalChatMessages.createNewGroupConversation}
      footer={[
        <Button
          key='create'
          loading={loading}
          onClick={() => {
            if (createFormRef.current) createFormRef.current.form.submit();
          }}
          size='large'
          type='primary'
        >
          {internalChatMessages.createNewGroupConversation}
        </Button>
      ]}
      centered
      destroyOnClose
      onCancel={onCancel}
    >
      <InternalChatGroupFormCreate
        onSubmitSuccess={(conversation) => {
          onCancel();
          onCreateSuccess?.(conversation);
        }}
        className='px-6'
        ref={createFormRef}
        onChangeLoading={setLoading}
      />
    </Modal.Small>
  );
};

export default InternalChatGroupModalCreate;
