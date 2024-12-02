import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button, Popover } from 'antd';
import { SmileIcon } from 'assets';
import React from 'react';
import { EmojiProps } from 'types';
type ChatEmojiProps = {
  handleSelect: (value: EmojiProps) => void;
};

const ChatEmoji: React.FC<ChatEmojiProps> = ({ handleSelect }) => {
  return (
    <Popover
      prefixCls='emoji-popover'
      trigger={['click']}
      placement='topRight'
      title={null}
      content={<Picker onEmojiSelect={handleSelect} theme='light' previewPosition='none' locale='vi' data={data} />}
    >
      <Button type='text' className='h-8 w-8 min-w-0 text-colorPrimary' shape='circle' icon={<SmileIcon />} />
    </Popover>
  );
};

export default ChatEmoji;
