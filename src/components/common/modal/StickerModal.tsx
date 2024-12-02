import { Button, Modal, ModalProps } from 'antd';
import { CloseIcon } from 'assets';
import React from 'react';
type StickerModalProps = ModalProps;
const StickerModal: React.FC<StickerModalProps> = ({ title, ...props }) => {
  return (
    <Modal
      {...props}
      styles={{
        body: {
          minHeight: 'calc(100vh - 224px)'
        }
      }}
      title={
        <div className='flex w-full items-center'>
          <div className='flex-1 text-center'>{title}</div>
          <Button
            onClick={props.onCancel}
            icon={<CloseIcon />}
            type='text'
            className='ml-auto h-8 w-8'
            shape='circle'
          />
        </div>
      }
      prefixCls='sticker-modal'
      centered={false}
    />
  );
};
export default StickerModal;
