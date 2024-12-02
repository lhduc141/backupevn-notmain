import { findIndex } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ConversationDto, FindAllMessageDto, GetMessageResponseDto, MessageDto, MessagePosition } from 'types';
import { calculateStartEndPositionMessage, maskedMessageReplied, MESSAGE_QUERY_TYPE } from 'utils';
import { useReceiveInternalChatMessage } from './useReceiveInternalChatMessage';
import { useReadAllMessageMutation } from 'services';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
type PropsType = {
  conversation: ConversationDto;
  fetchMessage: (value: FindAllMessageDto) => QueryActionCreatorResult<any>;
  hasNew?: boolean;
  setLoading: (value: boolean) => void;
};
export function useScrollInternalChatMessage({ conversation, fetchMessage, hasNew, setLoading }: PropsType) {
  const { conversationId } = conversation;
  const [isAtBottomScroll, setIsAtBottomScroll] = useState(true);
  const [displayIndex, setDisplayIndex] = useState({ start: 0, end: 50 });

  const messagesBoxRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<MessagePosition[]>([]);

  const [readAllMess] = useReadAllMessageMutation();

  const { handleReceiveOlderMessageList } = useReceiveInternalChatMessage(conversation);

  useEffect(() => {
    const div = messagesBoxRef?.current;
    if (div) {
      div.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (div) {
        div.removeEventListener('scroll', handleScroll);
      }
    };
  }, [positionsRef.current, messagesBoxRef]);

  const changeHeightChatList = (height: number, scrollTop?: number) => {
    if (messageListRef.current) {
      messageListRef.current.style.height = `${height}px`;
    }
    if (messagesBoxRef.current && scrollTop) {
      messagesBoxRef.current.scrollTop = scrollTop;
    }
  };

  const handleScroll = () => {
    if (!messagesBoxRef?.current) return;
    const scrollTop = messagesBoxRef.current.scrollTop;
    const clientHeight = messagesBoxRef.current.clientHeight;
    const scrollHeight = messagesBoxRef.current.scrollHeight;
    setIsAtBottomScroll(scrollTop > scrollHeight - 2 * clientHeight);
    setDisplayIndex(
      calculateStartEndPositionMessage(
        {
          scrollTop,
          clientHeight
        },
        positionsRef.current
      )
    );
  };

  const scrollToMessage = (repliedMessage: MessageDto, color?: string) => {
    const replyMessIdx = findIndex(positionsRef.current, (o) => o.messageId === repliedMessage.messageId);
    if (replyMessIdx === -1) return;
    if (!messageListRef.current) return;

    const messReplied = positionsRef.current[replyMessIdx];
    messagesBoxRef.current?.scrollTo({
      top: (messReplied?.position ?? 0) - (messReplied?.height > 100 ? 0 : 100),
      behavior: 'smooth'
    });
    maskedMessageReplied(messReplied, messageListRef.current, color, () => setLoading(false));
  };

  const scrollToEndMessage = () => {
    if (hasNew) {
      setLoading(true);
      if (messageListRef.current?.offsetHeight) {
        messagesBoxRef?.current?.scrollTo({
          top: messageListRef.current?.offsetHeight,
          behavior: 'smooth'
        });
      }
      fetchMessage({
        conversationId,
        startMessageId: undefined
      })
        .unwrap()
        .then(async (rs) => {
          const response = rs as GetMessageResponseDto;

          const data = await handleReceiveOlderMessageList(response.data.rows, null, []);
          if (data) {
            changeHeightChatList(data.height);
            positionsRef.current = data.positions;
            messagesBoxRef?.current?.scrollTo({
              top: data.height,
              behavior: 'smooth'
            });
          }
          readAllMess({
            conversationId
          }).unwrap();
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    } else {
      if (messagesBoxRef.current) {
        messagesBoxRef?.current?.scrollTo({
          top: messagesBoxRef.current?.scrollHeight + 200,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToMessageReplied = async (repliedMessage: MessageDto, color?: string) => {
    const replyMessIdx = findIndex(positionsRef.current, (o) => o.messageId === repliedMessage.messageId);
    if (replyMessIdx !== -1) {
      scrollToMessage(repliedMessage, color);
    } else {
      setLoading(true);
      messagesBoxRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      fetchRepliedMessage(repliedMessage, color);
    }
  };

  const fetchRepliedMessage = async (repliedMessage: MessageDto, color?: string) => {
    fetchMessage({
      conversationId,
      queryType: MESSAGE_QUERY_TYPE.NEWER,
      startMessageId: repliedMessage.messageId,
      limit: 30,
      message: repliedMessage
    })
      .unwrap()
      .then(async (rs) => {
        fetchMessage({
          conversationId,
          limit: 20,
          startMessageId: repliedMessage.messageId
        })
          .unwrap()
          .then(async (rsPrev) => {
            const response = rs as GetMessageResponseDto;
            const responsePrev = rsPrev as GetMessageResponseDto;

            const newData = [...(responsePrev.newMess || []), ...(response.data.rows || [])];
            const data = await handleReceiveOlderMessageList(newData, null, []);
            if (data) {
              changeHeightChatList(data.height);
              positionsRef.current = data.positions;
            }
            scrollToMessage(repliedMessage, color);
          });
      });
  };

  return {
    messagesBoxRef,
    messageListRef,
    positionsRef,
    isAtBottomScroll,
    displayIndex,
    scrollToEndMessage,
    scrollToMessageReplied,
    changeHeightChatList
  };
}
