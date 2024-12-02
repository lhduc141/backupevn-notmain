import { SendOutlined } from '@ant-design/icons';
import { Button, message as messageAntd, Upload } from 'antd';
import { internalChatMessages, messages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { ConversationDto, EmojiProps, FileUpload, MessageDto } from 'types';
import { CONVERSATION_TYPE, execCommand, moveCaretToEnd } from 'utils';
import ChatAttach from './ChatAttach';
import ChatEmoji from './ChatEmoji';
import ChatFileList from './ChatFileList';
import ChatInput, { ChatInputRefProps } from './ChatInput';
import ReplyMessage from './ChatReplyMessage';
import ChatSuggestions from './ChatSuggestions';

type ChatBoxProps = {
  onSend: (message: string, image: FileUpload[]) => void;
  onInput: (value: string) => void;
  conversation: ConversationDto;
  messageReplied?: MessageDto;
  removeReplyMessage?: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messageReplied, onSend, onInput, conversation, removeReplyMessage }) => {
  const [messageChat, setMessageChat] = useState<string>('');
  const [openSuggestion, setOpenSuggestion] = useState<boolean>(false);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);

  const [files, setFiles] = useState<FileUpload[]>([]);
  const chatInputRef = useRef<ChatInputRefProps>(null);

  const [messageApi, contextHolder] = messageAntd.useMessage();

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    const now = Date.now();
    const messageToSend = messageChat;

    /** Kiểm tra nếu người dùng gửi tin quá nhanh */
    if (lastSentTime && now - lastSentTime < 500) {
      messageApi.warning(internalChatMessages.sentToFast);
      return;
    }

    onSend(messageToSend, files);
    setMessageChat('');
    setFiles([]);
    if (chatInputRef.current && chatInputRef.current.input) {
      chatInputRef.current.input.innerHTML = '';
    }
    setLastSentTime(now);
  };

  const beforeUpload = (file: FileUpload) => {
    if (file.size && file.size / 1000 / 1000 >= 5) {
      messageApi.error(messages.fileSizeIsMax('5MB'));
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleRemoveFile = (_file: FileUpload, index: number) => {
    setFiles(files.filter((_file, idx) => idx !== index));
  };

  const handleSelectEmoji = (emoji: EmojiProps) => {
    if (emoji.native) {
      setMessageChat(messageChat + emoji.native);
      if (chatInputRef.current) {
        chatInputRef.current.restoreSelection();
        execCommand(emoji.native);
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <div className='flex min-h-[52px] flex-col transition-all'>
        <ReplyMessage removeReplyMessage={removeReplyMessage} conversation={conversation} message={messageReplied} />
        <div
          className='relative flex min-h-[52px] flex-1 items-end px-[10px] py-[6px]'
          onClick={() => {
            if (chatInputRef.current?.input) {
              if (document.activeElement !== chatInputRef.current?.input) {
                moveCaretToEnd(chatInputRef.current.input);
              }
            }
          }}
        >
          <div className='absolute bottom-[10px]'>
            <ChatAttach
              beforeUpload={beforeUpload}
              attachFile={(fileList) => {
                setFiles([...files, ...fileList]);
              }}
            />
          </div>
          <div className='relative ml-[42px] flex w-[calc(100%-90px)] cursor-text flex-col gap-2 rounded-[20px] bg-backgroundColor1 px-4 py-[11px]'>
            {conversation.type === CONVERSATION_TYPE.GROUP && (
              <ChatSuggestions
                setMessage={setMessageChat}
                participants={conversation.participants || []}
                chatInput={chatInputRef.current}
                open={openSuggestion}
                setOpen={setOpenSuggestion}
              />
            )}
            <ChatFileList fileList={files} handleRemove={handleRemoveFile} />
            <div className='relative flex w-full flex-1 items-center'>
              <ChatInput
                openSuggestion={openSuggestion}
                conversationId={conversation.conversationId}
                ref={chatInputRef}
                attachFile={(file) => {
                  setFiles([...files, file]);
                }}
                handleSend={handleSend}
                message={messageChat}
                setMessage={setMessageChat}
                beforeUpload={beforeUpload}
                onInput={onInput}
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className='absolute -bottom-2 -right-[6px]'
              >
                <ChatEmoji handleSelect={handleSelectEmoji} />
              </div>
            </div>
          </div>
          <div className='absolute bottom-[10px] right-[10px]'>
            <Button
              id='sent-message'
              type='text'
              className='h-8 w-8'
              shape='circle'
              icon={<SendOutlined className='text-colorPrimary' />}
              onClick={handleSend}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
