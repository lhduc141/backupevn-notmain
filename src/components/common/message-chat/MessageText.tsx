import { MenuProps, Typography } from 'antd';
import { CopyIcon } from 'assets';
import dayjs from 'dayjs';
import { useProfile } from 'hooks';
import { internalChatMessages } from 'messages';
import { memo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConversationParticiPantDto, MessageDto } from 'types';
import {
  getSelectedTextInDiv,
  MESSAGE_REF_TYPE,
  MESSAGE_TAG_NAME,
  stringToHslColor,
  TIME_FORMAT,
  transformUrlsToLinks
} from 'utils';
import MessageOptions, { MessageOptionsRef } from './MessageOptions';
import MessageUrl from './MessageUrl';
import MessageReplied from './MessageReplied';
import { useChatContext } from 'contexts';

type MessageTextProps = {
  data: MessageDto;
  sender?: ConversationParticiPantDto;
  isGroup?: boolean;
  isFirstOfSender?: boolean;
  onForwardMessage?: (message: MessageDto) => void;
  isImageMessage?: boolean;
  className?: string;
};

const MessageText: React.FC<MessageTextProps> = ({
  data,
  onForwardMessage,
  sender,
  isGroup,
  isFirstOfSender,
  isImageMessage,
  className
}) => {
  const { handleTagClick } = useChatContext();
  const { profile } = useProfile();

  const optionsRef = useRef<MessageOptionsRef>(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');

  const isMe = data.senderId === profile?.userId;
  const content = transformUrlsToLinks(data.content);
  const isUrls = !!data.metadata && !isImageMessage;
  const isHasSender = Boolean(!isMe && isGroup && sender && isFirstOfSender);
  const isReply = Boolean(data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage);

  const items: MenuProps['items'] = [
    {
      key: 'copy',
      label: selectedText.length > 0 ? internalChatMessages.copySelectedText : internalChatMessages.copy,
      onClick: async () => {
        try {
          const copyText = selectedText.length > 0 ? selectedText : data.content;
          await navigator.clipboard.writeText(copyText);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      },
      icon: <CopyIcon />
    },
    ...(selectedUrl?.length > 0
      ? [
          {
            key: 'copy-link',
            label: internalChatMessages.copyLinkText,
            onClick: async () => {
              try {
                const copyText = selectedUrl;
                await navigator.clipboard.writeText(copyText);
              } catch (err) {
                console.error('Failed to copy text: ', err);
              }
            },
            icon: <CopyIcon />
          }
        ]
      : [])
  ];
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'A') {
      const linkElement = target as HTMLAnchorElement;
      const url = linkElement.href;
      setSelectedUrl(url);
    } else {
      setSelectedUrl('');
    }
    const selection = getSelectedTextInDiv(e.currentTarget);
    setSelectedText(selection?.toString() ?? '');

    optionsRef.current?.open(e);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // Kiểm tra xem element click có phải là thẻ <span> với thuộc tính name="tag"
    if (target.tagName === 'SPAN' && target.getAttribute('name') === MESSAGE_TAG_NAME && !!target.getAttribute('id')) {
      const userIdTag = target.getAttribute('id');
      userIdTag && handleTagClick(Number(userIdTag));
    }
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      className={twMerge(
        'relative min-w-[70px] whitespace-pre-wrap break-words rounded-lg px-3 pb-8 pt-2 text-left text-sm',
        isMe ? 'bg-colorBgMyMessage' : 'bg-colorBgMessage',
        className
      )}
      style={{
        maxWidth: isUrls ? 336 : 556
      }}
    >
      {!isImageMessage && isHasSender && (
        <Typography.Paragraph
          style={{
            color: stringToHslColor(sender!.name, 80, 35)
          }}
          className='mb-2 text-sm font-semibold'
        >
          {sender!.name}
        </Typography.Paragraph>
      )}

      {!isImageMessage && isReply && (
        <div className='mb-1'>
          <MessageReplied data={data.refMessage!} />
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: content }}></div>

      {isUrls ? (
        <div>
          <MessageUrl data={data.metadata!} />
        </div>
      ) : null}

      <Typography.Paragraph className='absolute bottom-3 left-3 mb-0 select-none text-xs' type='secondary'>
        {dayjs(data.sentAt).format(TIME_FORMAT)}
      </Typography.Paragraph>
      <MessageOptions onForwardMessage={onForwardMessage} ref={optionsRef} items={items} message={data} />
    </div>
  );
};

export default memo(MessageText);
