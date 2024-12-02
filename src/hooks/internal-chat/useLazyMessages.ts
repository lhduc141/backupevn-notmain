import { useCallback } from 'react';
import { useLazyGetInternalChatMessagesQuery } from 'services';
import { ConversationDto, FindAllMessageDto } from 'types';
import { MESSAGE_LIMIT_LOAD, MESSAGE_QUERY_TYPE } from 'utils';
const limit = MESSAGE_LIMIT_LOAD;
export function useLazyMessages(conversation: ConversationDto) {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs, endpointName }] =
    useLazyGetInternalChatMessagesQuery({
      refetchOnReconnect: true
    });

  const { rows, count } = dataResponse?.data || {};
  const hasMore = Boolean(rows && count && rows.length < count);
  const endMessage = rows && rows[rows.length - 1];
  const hasNew =
    endMessage?.messageId && endMessage?.status !== 'pending'
      ? endMessage?.conversationId === conversation.lastMessage?.conversationId &&
      endMessage?.messageId !== conversation.lastMessage?.messageId
      : false;

  const getOlderMess = useCallback(
    (value?: Partial<FindAllMessageDto>) => {
      return trigger({
        ...(originalArgs as FindAllMessageDto),
        limit,
        skip: 0,
        queryType: MESSAGE_QUERY_TYPE.OLDER,
        message: undefined,
        startMessageId: rows?.filter((o) => o.status !== 'pending')?.[0]?.messageId,
        ...value
      });
    },
    [hasMore, originalArgs, rows]
  );

  const getNewerMess = useCallback(
    (value?: Partial<FindAllMessageDto>) => {
      return trigger({
        ...(originalArgs as FindAllMessageDto),
        limit,
        skip: 0,
        queryType: MESSAGE_QUERY_TYPE.NEWER,
        message: undefined,
        startMessageId: rows?.filter((o) => o.status !== 'pending')?.[rows.length - 1]?.messageId,
        ...value
      });
    },
    [hasMore, originalArgs, rows]
  );

  const fetchData = useCallback(
    (value: FindAllMessageDto) => {
      return trigger({
        ...originalArgs,
        limit,
        skip: 0,
        queryType: undefined,
        message: undefined,
        ...value
      });
    },
    [trigger]
  );
  return {
    data: rows || [],
    count: count || 0,
    isLoading: isLoading,
    hasMore,
    hasNew,
    fetchData,
    getOlderMess,
    isFetching: isFetching,
    originalArgs,
    endpointName,
    getNewerMess
  };
}
