import { Modal, ModalProps } from 'antd';
import React from 'react';
type SmallModalProps = ModalProps;
const SmallModal: React.FC<SmallModalProps> = ({ ...props }) => {
  return <Modal {...props} prefixCls='small-modal' />;
};
export default SmallModal;
