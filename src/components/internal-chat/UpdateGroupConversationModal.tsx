import { Button, ModalProps } from 'antd';
import { internalChatMessages, messages } from 'messages';
import { useRef, useState } from 'react';
import GroupChatInfoForm, { GroupChatInfoFormRefProps } from './GroupChatInfoForm';
import { Modal } from 'components/common';

type UpdateGroupConversationModalProps = ModalProps & {
  conversationId: string;
  onClose?: () => void;
};

const UpdateGroupConversationModal: React.FC<UpdateGroupConversationModalProps> = ({
  conversationId,
  onClose,
  ...props
}) => {
  const [loadingFormRef, setLoadingForm] = useState(false);
  const infoFormRef = useRef<GroupChatInfoFormRefProps>(null);

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      width={568}
      title={internalChatMessages.changeGroupName}
      footer={[
        <Button
          key='save'
          loading={loadingFormRef}
          onClick={() => {
            if (infoFormRef.current) {
              infoFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.saveButtonText}
        </Button>
      ]}
      destroyOnClose
      styles={{
        body: {
          paddingTop: 52,
          paddingBottom: 64
        }
      }}
    >
      <div className='px-6'>
        <GroupChatInfoForm
          onCreateSuccess={() => {
            onClose?.();
          }}
          ref={infoFormRef}
          onChangeLoading={setLoadingForm}
          conversationId={conversationId}
        />
      </div>
    </Modal>
  );
};

export default UpdateGroupConversationModal;
