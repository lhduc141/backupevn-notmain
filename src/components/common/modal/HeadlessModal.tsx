import { Modal, ModalProps, Typography } from 'antd';
import React from 'react';
type HeadlessModalProps = ModalProps;

const HeadlessModal: React.FC<HeadlessModalProps> = ({ title, children, ...props }) => {
  return (
    <Modal {...props}>
      <Typography.Title className='mb-6 mt-10 text-2.5xl'>{title}</Typography.Title>
      {children}
    </Modal>
  );
};
export default HeadlessModal;
