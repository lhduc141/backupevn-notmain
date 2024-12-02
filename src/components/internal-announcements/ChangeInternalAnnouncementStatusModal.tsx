import { Button, ModalProps } from 'antd';
import InternalAnnouncementChangeStatusForm, { InternalAnnouncementStatusRefProps } from './InternalAnnouncementStatus';
import { useEffect, useRef, useState } from 'react';
import { messages } from 'messages';
import { Modal } from 'components/common';

type ChangeInternalAnnouncementStatusModalProps = ModalProps & {
  internalAnnouncementId?: number;
  onClose?: () => void;
};

const ChangeInternalAnnouncementStatusModal = ({
  internalAnnouncementId,
  onClose,
  ...props
}: ChangeInternalAnnouncementStatusModalProps) => {
  const [loading, setLoading] = useState(false);

  const internalAnnouncementStatusFormRef = useRef<InternalAnnouncementStatusRefProps>(null);

  useEffect(() => {
    if (!props.open && internalAnnouncementStatusFormRef.current) {
      internalAnnouncementStatusFormRef.current.form.resetFields();
    }
  }, [props.open, internalAnnouncementStatusFormRef.current]);

  return (
    <Modal.Headless
      {...props}
      title={messages.updateStatus}
      maskClosable={false}
      centered
      destroyOnClose
      footer={[
        <Button
          key='btn-submit'
          loading={loading}
          onClick={() => {
            if (internalAnnouncementStatusFormRef.current) {
              internalAnnouncementStatusFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.saveButtonText}
        </Button>
      ]}
    >
      {internalAnnouncementId && (
        <InternalAnnouncementChangeStatusForm
          internalAnnouncementId={internalAnnouncementId}
          onSuccess={onClose}
          ref={internalAnnouncementStatusFormRef}
          onChangeLoading={setLoading}
        />
      )}
    </Modal.Headless>
  );
};

export default ChangeInternalAnnouncementStatusModal;
