import { Button } from 'antd';
import { RcFile } from 'antd/es/upload';
import { AttachIcon } from 'assets';
import React from 'react';
import { FileUpload } from 'types';
import { Upload } from '../upload';

type ChatAttachProps = {
  attachFile: (val: FileUpload[]) => void;
  beforeUpload: (val: FileUpload) => boolean | string;
};

const ChatAttach: React.FC<ChatAttachProps> = ({ attachFile, beforeUpload }) => {
  return (
    <>
      <Upload
        multiple
        beforeUpload={beforeUpload}
        fileList={[]}
        itemRender={() => null}
        name='file-attach'
        onChange={(info) => {
          const { fileList } = info;
          attachFile(fileList.map((o) => o.originFileObj as RcFile));
        }}
      >
        <Button type='text' className='h-8 w-8 min-w-0 text-colorPrimary' shape='circle' icon={<AttachIcon />} />
      </Upload>
    </>
  );
};

export default ChatAttach;
