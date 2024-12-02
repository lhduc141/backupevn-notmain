import { FileOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { find } from 'lodash';
import React from 'react';
import { colorsBase } from 'themes';
import { FileUpload } from 'types';
import { convertBytes, convertFileType, FILE_SYMBOL } from 'utils';
import EllipsisText from '../EllipsisText';
type ChatFileProps = {
  file: FileUpload;
};
const ChatFile: React.FC<ChatFileProps> = ({ file, ...props }) => {
  const fileSymbol = find(FILE_SYMBOL, {
    value: convertFileType(file.type)
  });
  return (
    <div className='flex h-12 items-center gap-2 rounded-base border bg-white p-1'>
      <div
        className='flex h-8 w-8 items-center justify-center rounded text-white'
        style={{
          background: fileSymbol?.color || colorsBase.colorPrimary
        }}
      >
        {fileSymbol?.icon || <FileOutlined className='text-white' />}
      </div>
      <div className='flex max-w-[200px] flex-col text-left'>
        {file.name && <EllipsisText value={file.name} fontSize={14} className='font-semibold' />}
        {file.size && (
          <Typography.Text className='text-xs' ellipsis>
            {convertBytes(file.size)}
          </Typography.Text>
        )}
      </div>
    </div>
  );
};
export default ChatFile;
