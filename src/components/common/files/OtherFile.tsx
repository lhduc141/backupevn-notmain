import { FileOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { find } from 'lodash';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { colorsBase } from 'themes';
import { convertBytes, convertFileType, FILE_SYMBOL } from 'utils';
import EllipsisText from '../EllipsisText';

type OtherFileProps = {
  type?: string;
  name?: string;
  className?: string;
  showInfo?: boolean;
  fileSize?: number;
  iconSize?: number;
};
const OtherFile: React.FC<OtherFileProps> = ({ fileSize, type, name, className, showInfo = true, iconSize = 32 }) => {
  const fileSymbol = find(FILE_SYMBOL, {
    value: convertFileType(type)
  });

  return (
    <div className={twMerge('flex h-full w-full max-w-[320px] items-center gap-2', className)}>
      <div
        className='flex items-center justify-center rounded text-white'
        style={{
          background: fileSymbol?.color || colorsBase.colorPrimary,
          width: iconSize,
          height: iconSize,
          fontSize: iconSize / 2
        }}
      >
        {fileSymbol?.icon || <FileOutlined className='text-white' />}
      </div>
      {showInfo ? (
        <div
          className='flex w-full flex-col text-left'
          style={{
            maxWidth: `calc(100% - ${iconSize + 24}px)`
          }}
        >
          {name && <EllipsisText value={name} fontSize={14} className='font-semibold' />}
          {fileSize && (
            <Typography.Text className='text-xs' ellipsis>
              {convertBytes(fileSize)}
            </Typography.Text>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default OtherFile;
