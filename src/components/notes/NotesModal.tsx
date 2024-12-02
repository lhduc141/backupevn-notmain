import { Modal } from 'antd';
import { messages } from 'messages';
import React, { useRef } from 'react';
import Notes, { NotesRefProps } from './Notes';
type NotesModalProps = {
  open: boolean;
  onCancel: () => void;
};
const NotesModal: React.FC<NotesModalProps> = ({ open, onCancel }) => {
  const noteRef = useRef<NotesRefProps>(null);

  return (
    <Modal
      styles={{
        body: { padding: 0 }
      }}
      width={800}
      open={open}
      onCancel={() => {
        if (noteRef.current) {
          noteRef.current.handleSaveNote();
        }
        onCancel();
      }}
      centered
      footer={null}
      maskClosable
      title={messages.note}
      forceRender
    >
      <Notes ref={noteRef} open={open} />
    </Modal>
  );
};
export default NotesModal;
