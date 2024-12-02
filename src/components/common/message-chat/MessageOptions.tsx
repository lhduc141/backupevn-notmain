import { Dropdown, MenuProps } from 'antd';
import { ForwardIcon, ReplyIcon } from 'assets';
import { useReplyInternalChatMessage } from 'hooks';
import { internalChatMessages } from 'messages';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { MessageDto } from 'types';

type MessageOptionsProps = {
  items: MenuProps['items'];
  message: MessageDto;
  onForwardMessage?: (message: MessageDto) => void;
};
export type MessageOptionsRef = {
  open: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const MessageOptions = forwardRef<MessageOptionsRef, MessageOptionsProps>(
  ({ message, items, onForwardMessage }, ref) => {
    useImperativeHandle(ref, () => ({
      open: handleRightClick
    }));
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { handleReplyMessage } = useReplyInternalChatMessage();

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      const elementRect = event.currentTarget.getBoundingClientRect();

      /** Tính toán vị trí tương đối của con trỏ chuột so với phần tử*/
      const relativeX = event.clientX - elementRect.left;
      const relativeY = event.clientY - elementRect.top;

      setPosition({
        x: relativeX,
        y: relativeY
      });

      setOpen(true);
    };

    const handleReply = () => {
      handleReplyMessage(message);
      const inputChat = document.getElementById(`chat-input-fake-${message.conversationId}`);
      if (inputChat) {
        inputChat.focus();
      }
    };

    const itemsMenu = [
      ...(items || []),
      {
        key: 'reply',
        label: internalChatMessages.reply,
        onClick: () => handleReply(),
        icon: <ReplyIcon />
      },
      {
        key: 'forward',
        label: internalChatMessages.forward,
        onClick: () => onForwardMessage?.(message),
        icon: <ForwardIcon />
      }
    ];

    if (open)
      return (
        <Dropdown
          menu={{
            items: itemsMenu
          }}
          trigger={['click']}
          open={open}
          onOpenChange={setOpen}
          getPopupContainer={() => document.body}
          overlayClassName='text-sm'
          prefixCls='message-dropdown'
        >
          <div
            style={{
              position: 'absolute',
              top: `${position.y}px`,
              left: `${position.x}px`,
              zIndex: 9999
            }}
          />
        </Dropdown>
      );
    return null;
  }
);

export default MessageOptions;
