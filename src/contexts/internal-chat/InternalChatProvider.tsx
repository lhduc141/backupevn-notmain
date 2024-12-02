import { Spin } from 'antd';
import {
  useLazyMessages,
  useProfile,
  useReceiveInternalChatMessage,
  useReplyInternalChatMessage,
  useScrollInternalChatMessage,
  useSentInternalChatMessage
} from 'hooks';
import { findIndex } from 'lodash';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { offReceiveMessage, onReceiveMessage, useReadAllMessageMutation, useReadMessagesMutation } from 'services';
import { ConversationDto, FileUpload, MessageDto, MessagePosition } from 'types';
import { convertFileType, FILE_TYPE, generateUUID, MESSAGE_REF_TYPE, MESSAGE_TYPE } from 'utils';

export type InternalChatContextProps = {
  messages: MessageDto[];
  positions: MessagePosition[];
  messageListRef: React.RefObject<HTMLDivElement> | null;
  messagesBoxRef: React.RefObject<HTMLDivElement> | null;
  conversation: ConversationDto;
  hasMore: boolean;
  hasNew: boolean;
  isFetching: boolean;
  isAtBottomScroll: boolean;
  onGetNewerMess: () => void;
  onGetOlderMess: () => void;
  scrollToEndMessage: () => void;
  scrollToMessageReplied: (repliedMessage: MessageDto, color?: string) => void;
  onSentMessage: (message: string, files: FileUpload[]) => void;
  handleTagClick: (userId: number) => void;
  displayIndex: {
    start: number;
    end: number;
  };
};

export const InternalChatContext = createContext<InternalChatContextProps | undefined>(undefined);

export const InternalChatProvider: React.FC<{
  children: React.ReactNode;
  conversation: ConversationDto;
  endpointName?: string;
  handleTagClick: (userId: number) => void;
}> = ({ children, conversation, endpointName, handleTagClick }) => {
  const { conversationId } = conversation;
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);

  const [readAllMess] = useReadAllMessageMutation();
  const [readMess] = useReadMessagesMutation();

  const {
    fetchData: fetchMessage,
    data: messages,
    isFetching,
    isLoading,
    hasMore,
    hasNew,
    getOlderMess,
    getNewerMess,
    endpointName: endpointNameMessages
  } = useLazyMessages(conversation);

  const {
    isAtBottomScroll,
    displayIndex,
    positionsRef,
    changeHeightChatList,
    messagesBoxRef,
    messageListRef,
    scrollToEndMessage,
    scrollToMessageReplied
  } = useScrollInternalChatMessage({ conversation, fetchMessage, hasNew, setLoading });

  const { messageReplied, handleRemoveReplyMessage } = useReplyInternalChatMessage();

  const { handleReceiveNewMessage, handleReceiveNewerMessageList, handleReceiveOlderMessageList } =
    useReceiveInternalChatMessage(conversation);

  const { handleAddMessage, handleUpdateAddMessage, handleSentMessage } = useSentInternalChatMessage(
    conversationId,
    endpointName,
    endpointNameMessages
  );

  const lastMessageRef = useRef<MessageDto | null>(null);
  const firstMessageRef = useRef<MessageDto | null>(null);

  useEffect(() => {
    if (conversationId) {
      onGetMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    onReceiveMessage((data) => {
      if (data.conversationId === conversationId) {
        onReceiveNewMessage(data);
      }
    });
    return () => {
      offReceiveMessage();
    };
  }, [conversationId, handleAddMessage, hasNew]);

  useEffect(() => {
    lastMessageRef.current = messages[messages.length - 1];
    firstMessageRef.current = messages[0];

    return () => {
      lastMessageRef.current = null;
      firstMessageRef.current = null;
    };
  }, [messages]);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onGetMessages = () => {
    fetchMessage({
      conversationId
    })
      .unwrap()
      .then(async (rs) => {
        positionsRef.current = [];
        const data = await handleReceiveOlderMessageList(rs.data.rows, null, []);
        if (data) {
          changeHeightChatList(data.height, data.height);
          positionsRef.current = data.positions;
        }
        readAllMess({
          conversationId
        }).unwrap();
      });
  };

  const onGetOlderMess = () => {
    if (loading || isFetching || isLoading || !hasMore) return;
    getOlderMess().then(async (rs) => {
      if (rs.data?.newMess) {
        const data = await handleReceiveOlderMessageList(
          rs.data?.newMess,
          firstMessageRef.current,
          positionsRef.current
        );
        if (data) {
          positionsRef.current = data.positions;
          const currentScroll = messagesBoxRef.current?.scrollTop ?? 0;
          changeHeightChatList(data.height, currentScroll + data.changedHeight);
        }
      }
    });
  };

  const onGetNewerMess = () => {
    if (loading || isFetching || isLoading || !hasNew) return;
    getNewerMess().then(async (rs) => {
      if (rs.data?.newMess?.length) {
        const data = await handleReceiveNewerMessageList(
          rs.data?.newMess,
          lastMessageRef.current,
          positionsRef.current
        );
        if (data) {
          positionsRef.current = data.positions;
          const currentScroll = messagesBoxRef.current?.scrollTop ?? 0;
          changeHeightChatList(data.height, data.removedHeight ? currentScroll - data.removedHeight : currentScroll);
        }
      }
    });
  };

  const onReceiveNewMessage = async (message: MessageDto) => {
    if (message.senderId === profile?.userId && message.type !== MESSAGE_TYPE.SYSTEM) return;
    if (isAtBottomScroll && !hasNew) {
      const data = handleReceiveNewMessage(message, lastMessageRef.current, positionsRef.current);
      if (data) {
        positionsRef.current = data.positions;
        const currentScroll = messagesBoxRef.current?.scrollTop ?? 0;
        changeHeightChatList(data.height, data.removedHeight ? currentScroll - data.removedHeight : currentScroll);
        messagesBoxRef.current?.scrollTo({
          top: data.height,
          behavior: 'smooth'
        });
        handleAddMessage(message);
        readMess({ messageId: [message.messageId] }).unwrap();
      }
    }
  };
  const onSentMessage = async (content: string, files: FileUpload[]) => {
    const messages = [];
    const imageFiles = files.filter((o) => convertFileType(o.type) === FILE_TYPE.IMAGE);
    const otherFiles = files.filter((o) => convertFileType(o.type) !== FILE_TYPE.IMAGE);
    let isReply = Boolean(messageReplied && messageReplied.conversationId === conversationId);

    if (content.trim() || imageFiles.length) {
      const msgData = convertData(
        imageFiles,
        imageFiles.length ? MESSAGE_TYPE.IMAGE : MESSAGE_TYPE.TEXT,
        content.trim(),
        isReply
      );
      isReply && handleRemoveReplyMessage();
      isReply = false;
      messages.push(msgData);
    }

    if (otherFiles.length) {
      await delay(100);
      const msgData = convertData(otherFiles, MESSAGE_TYPE.FILE, '', isReply);
      messages.push(msgData);
    }
    if (messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        await sentMessage(msg, msg.messageId);
      }
    }
    scrollToEndMessage();
  };

  const convertData = (files: FileUpload[], type: MESSAGE_TYPE, content = '', isReply?: boolean) => {
    const tempMessageId = generateUUID();
    const msgData: Omit<MessageDto, 'fileId'> & { fileId?: FileUpload[] } = {
      messageId: tempMessageId,
      content,
      fileId: files,
      type,
      senderId: profile?.userId,
      conversationId,
      status: 'pending',
      refType: isReply ? MESSAGE_REF_TYPE.REPLY : undefined,
      refMessage: isReply ? messageReplied : undefined
    };
    handleAddMessage(msgData);
    const data = handleReceiveNewMessage(msgData, lastMessageRef.current, positionsRef.current);
    if (data) {
      positionsRef.current = data.positions;
      const currentScroll = messagesBoxRef.current?.scrollTop ?? 0;
      changeHeightChatList(data.height, data.removedHeight ? currentScroll - data.removedHeight : currentScroll);
    }

    return msgData;
  };

  const sentMessage = async (
    msgData: Omit<MessageDto, 'fileId'> & { fileId?: FileUpload[] },
    tempMessageId: string
  ) => {
    await handleSentMessage(msgData).then((rs) => {
      if (rs?.data) {
        const idxPos = findIndex(positionsRef.current, {
          messageId: tempMessageId
        });
        if (idxPos !== -1) {
          positionsRef.current[idxPos].messageId = rs.data.messageId;
        }
        handleUpdateAddMessage(rs?.data, tempMessageId);
      }
    });
  };

  return (
    <InternalChatContext.Provider
      value={{
        conversation,
        handleTagClick,
        messageListRef,
        messagesBoxRef,
        positions: positionsRef.current,
        displayIndex: {
          start: displayIndex.start,
          end: displayIndex.end
        },
        isAtBottomScroll,
        scrollToEndMessage,
        scrollToMessageReplied,

        hasMore,
        hasNew,
        isFetching,
        messages,
        onGetNewerMess,
        onGetOlderMess,
        onSentMessage
      }}
    >
      <Spin spinning={isLoading || isFetching}>{children}</Spin>
    </InternalChatContext.Provider>
  );
};
export default InternalChatProvider;
