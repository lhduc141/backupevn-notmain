import { Button, ModalProps } from 'antd';
import { Modal } from 'components/common';
import { useRef, useState } from 'react';
import AddParticipantsForm, { AddParticipantsFormRefProps } from './AddParticipantsForm';
import { internalChatMessages, messages } from 'messages';

type AddParticipantsModalProps = ModalProps & {
  conversationId: string;
  onClose?: () => void;
};

const AddParticipantsModal = ({ conversationId, onClose, ...props }: AddParticipantsModalProps) => {
  const [loadingFormRef, setLoadingForm] = useState(false);

  const addParticipantsFormRef = useRef<AddParticipantsFormRefProps>(null);

  return (
    <Modal.Small
      {...props}
      maskClosable={false}
      centered
      width={568}
      title={internalChatMessages.addParticipants}
      footer={[
        <Button
          key='save'
          loading={loadingFormRef}
          onClick={() => {
            if (addParticipantsFormRef.current) {
              addParticipantsFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.confirmButtonText}
        </Button>
      ]}
      destroyOnClose
      styles={{
        body: {
          paddingBottom: 64
        }
      }}
    >
      <AddParticipantsForm
        onCreateSuccess={() => {
          onClose?.();
        }}
        ref={addParticipantsFormRef}
        onChangeLoading={setLoadingForm}
        conversationId={conversationId}
      />
    </Modal.Small>
  );
};

export default AddParticipantsModal;
