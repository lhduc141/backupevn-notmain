import { MESSAGE_LIMIT_CURRENT, MESSAGE_LIMIT_LOAD } from './../../utils/constants/message.constant';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AddGroupConversationGroupParticipantsDto,
  ConversationDto,
  CreateGroupConversationDto,
  CreateMessageDto,
  CreatePrivateConversationDto,
  FindAllConversationDto,
  FindAllMessageDto,
  ForwardMessageDto,
  GetMessageResponseDto,
  MessageDto,
  ReadAllMessagesDto,
  ReadMessagesDto,
  RemoveGroupConversationGroupParticipantDto,
  ReplyMessageDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateGroupConversationAdminDto,
  UpdateGroupConversationDto,
  UpdateMessageDto
} from 'types';

import { debounce, findIndex, sortBy, uniqBy } from 'lodash';
import { AppDispatch } from 'store';
import { convertMetadata, extractUrls, fetchMetadata, MESSAGE_QUERY_TYPE } from 'utils';
import axiosBaseQuery from 'utils/base-api';
import {
  offIncrementUnreadCount,
  offReceiveConversation,
  offReceiveMessage,
  onIncrementUnreadCount,
  onLeaveGroupConversation,
  onReceiveConversation
} from './internal-chat.socket-client';

export const internalChatApi = createApi({
  reducerPath: 'internalChatApi',
  tagTypes: ['conversations', 'conversation_detail', 'messages', 'internal_chat_unread'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getInternalChatCountUnread: builder.query<ResponseDto<number>, void>({
      query: () => ({
        url: `/internal_chat/count_unread`,
        method: 'get'
      }),
      providesTags: ['internal_chat_unread'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          onIncrementUnreadCount((data) => {
            updateCachedData((draft) => {
              draft.data += data;
            });
          });
        } catch (err) {
          console.log({ err });
        }

        await cacheEntryRemoved;
        offIncrementUnreadCount();
      }
    }),

    getConversations: builder.query<ResponsePagingDto<ConversationDto>, FindAllConversationDto>({
      query: (params) => ({
        url: '/internal_chat',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.skip !== 0) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else {
          currentCache.data.rows = newItems.data.rows;
        }
        currentCache.data.count = newItems.data.count;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ conversationId }) => ({
              type: 'conversations',
              id: conversationId
            }))
          : ['conversations'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          onReceiveConversation((data) => {
            if (data && data.conversationId) {
              debounce(() => {
                updateCachedData((draft) => {
                  const newConversationList = [data, ...draft.data.rows].filter(
                    (conversation) => !conversation.deletedAt
                  );
                  let conversationList = uniqBy(newConversationList, 'conversationId');
                  conversationList = sortBy(conversationList, (o) => new Date(o.updatedAt)).reverse();
                  draft.data.rows = conversationList;
                });
              }, 100)();
            }
          });

          onLeaveGroupConversation((data) => {
            debounce(() => {
              updateCachedData((draft) => {
                const newConversationList = [...draft.data.rows].filter(
                  (conversation) => !conversation.deletedAt && conversation.conversationId !== data
                );
                let conversationList = uniqBy(newConversationList, 'conversationId');
                conversationList = sortBy(conversationList, (o) => new Date(o.updatedAt)).reverse();
                draft.data.rows = conversationList;
              });
            }, 100)();
          });
        } catch (err) {
          console.log({ err });
        }

        await cacheEntryRemoved;
        offReceiveMessage();
      }
    }),

    getInternalChat: builder.query<ResponsePagingDto<ConversationDto>, FindAllConversationDto>({
      query: (params) => ({
        url: '/internal_chat',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.skip !== 0) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else {
          currentCache.data.rows = newItems.data.rows;
        }
        currentCache.data.count = newItems.data.count;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ conversationId }) => ({
              type: 'conversations',
              id: conversationId
            }))
          : ['conversations']
    }),

    createPrivateConversation: builder.mutation<ResponseDto<ConversationDto>, CreatePrivateConversationDto>({
      query: ({ userId }) => ({
        url: `/internal_chat/private/${userId}`,
        method: 'post'
      })
    }),

    createGroupConversation: builder.mutation<ResponseDto<ConversationDto>, CreateGroupConversationDto>({
      query: (newGroup) => ({
        url: '/internal_chat/group',
        method: 'post',
        data: newGroup
      })
    }),

    getConversationDetail: builder.query<ResponseDto<ConversationDto>, string>({
      query: (conversationId) => ({
        url: `/internal_chat/${conversationId}`,
        method: 'get'
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: (result) => (result?.data ? [{ type: 'conversation_detail', id: result.data.conversationId }] : []),
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          onReceiveConversation((data) => {
            updateCachedData((draft) => {
              if (draft.data.conversationId === data.conversationId) {
                draft.data = data;
              }
            });
          });
        } catch (err) {
          console.log({ err });
        }

        await cacheEntryRemoved;
        offReceiveConversation();
      }
    }),

    getInternalChatMessages: builder.query<GetMessageResponseDto, FindAllMessageDto>({
      query: ({ message: replyMessage, ...params }) => ({
        url: '/internal_chat/messages',
        method: 'get',
        params
      }),
      async transformResponse(response: GetMessageResponseDto) {
        const updatedRows = await addMetadataToMessages(response.data.rows);
        return {
          ...response,
          data: {
            ...response.data,
            rows: updatedRows
          }
        };
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName + queryArgs.conversationId,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.message) {
          const updatedRows = [...newItems.data.rows];
          if (arg.queryType === MESSAGE_QUERY_TYPE.NEWER) {
            updatedRows.unshift(arg.message);
          } else {
            updatedRows.push(arg.message);
          }

          currentCache.data.count = newItems.data.count + 1;
          currentCache.newMess = updatedRows;
          currentCache.data.rows = updatedRows;
          return;
        }

        if (arg?.startMessageId) {
          let currentRows = [...currentCache.data.rows];
          if (arg.queryType === MESSAGE_QUERY_TYPE.NEWER) {
            currentRows =
              currentRows.length >= MESSAGE_LIMIT_CURRENT ? currentRows.slice(MESSAGE_LIMIT_LOAD) : currentRows;
            currentCache.data.rows = [...currentRows, ...newItems.data.rows];
          } else {
            currentRows =
              currentRows.length >= MESSAGE_LIMIT_CURRENT ? currentRows.slice(0, -MESSAGE_LIMIT_LOAD) : currentRows;
            currentCache.data.rows = [...newItems.data.rows, ...currentRows];
          }
          currentCache.data.count = newItems.data.count;
          currentCache.newMess = newItems.data.rows;
          return;
        }

        currentCache.data.count = newItems.data.count;
        currentCache.newMess = newItems.data.rows;
        currentCache.data.rows = newItems.data.rows;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.conversationId !== previousArg?.conversationId;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ messageId, conversationId }) => ({
              type: 'messages',
              id: conversationId
            }))
          : ['messages']
    }),

    sendMessage: builder.mutation<ResponseDto<MessageDto>, CreateMessageDto>({
      query: (newChat) => ({
        url: '/internal_chat/messages',
        method: 'post',
        data: newChat
      })
    }),

    replyMessage: builder.mutation<ResponseDto<MessageDto>, ReplyMessageDto>({
      query: (newChat) => ({
        url: '/internal_chat/messages/reply',
        method: 'post',
        data: newChat
      })
    }),

    forwardMessage: builder.mutation<ResponseDto<MessageDto>, ForwardMessageDto>({
      query: (newChat) => ({
        url: '/internal_chat/messages/forward',
        method: 'post',
        data: newChat
      })
    }),

    updateMessage: builder.mutation<ResponseDto<ConversationDto>, UpdateMessageDto>({
      query: ({ messageId }) => ({
        url: `/internal_chat/messages/${messageId}/read`,
        method: 'patch'
      })
    }),

    updateGroupConversation: builder.mutation<ResponseDto<ConversationDto>, UpdateGroupConversationDto>({
      query: ({ conversationId, ...updateGroupConversation }) => ({
        url: `/internal_chat/group/${conversationId}`,
        method: 'patch',
        data: updateGroupConversation
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'conversations', id: param.conversationId },
        { type: 'conversation_detail', id: param.conversationId }
      ]
    }),

    updateGroupConversationAdmin: builder.mutation<ResponseDto<ConversationDto>, UpdateGroupConversationAdminDto>({
      query: ({ conversationId, ...updateGroupConversationAdmin }) => ({
        url: `/internal_chat/group/${conversationId}/admin`,
        method: 'patch',
        data: updateGroupConversationAdmin
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'conversations', id: param.conversationId },
        { type: 'conversation_detail', id: param.conversationId }
      ]
    }),

    addGroupConversationParticipants: builder.mutation<
      ResponseDto<ConversationDto>,
      AddGroupConversationGroupParticipantsDto
    >({
      query: ({ conversationId, ...addGroupConversationParticipants }) => ({
        url: `/internal_chat/group/${conversationId}/add_participants`,
        method: 'patch',
        data: addGroupConversationParticipants
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'conversations', id: param.conversationId },
        { type: 'conversation_detail', id: param.conversationId }
      ]
    }),

    removeGroupConversationParticipant: builder.mutation<
      ResponseDto<ConversationDto>,
      RemoveGroupConversationGroupParticipantDto
    >({
      query: ({ conversationId, ...removeGroupConversationParticipant }) => ({
        url: `/internal_chat/group/${conversationId}/remove_participant`,
        method: 'patch',
        data: removeGroupConversationParticipant
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'conversations', id: param.conversationId },
        { type: 'conversation_detail', id: param.conversationId }
      ]
    }),

    leaveGroupConversation: builder.mutation<ResponseDto<ConversationDto>, string>({
      query: (conversationId) => ({
        url: `/internal_chat/group/${conversationId}/leave`,
        method: 'patch'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'conversations' }, { type: 'conversations', id: param }]
    }),

    // Delete a chat group by conversationId
    deleteGroupConversation: builder.mutation<ResponseDto<null>, string>({
      query: (conversationId) => ({
        url: `/internal_chat/group/${conversationId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'conversations' }, { type: 'conversations', id: param }]
    }),

    readAllMessage: builder.mutation<ResponseDto<null>, ReadAllMessagesDto>({
      query: (readAllMessagesData) => ({
        url: `/internal_chat/messages/read_all`,
        method: 'post',
        data: readAllMessagesData
      })
    }),

    readMessages: builder.mutation<ResponseDto<null>, ReadMessagesDto>({
      query: (readMessagesData) => ({
        url: `/internal_chat/messages/read`,
        method: 'post',
        data: readMessagesData
      })
    })
  })
});

function addMessageInternalChat(data: MessageDto, endpointName: any, arg?: Partial<FindAllMessageDto>) {
  return (dispatch: AppDispatch) => {
    dispatch(
      internalChatApi.util.updateQueryData(endpointName, arg, (draftData: any) => {
        let currentRows = [...draftData.data.rows];
        currentRows = currentRows.length >= MESSAGE_LIMIT_CURRENT ? currentRows.slice(MESSAGE_LIMIT_LOAD) : currentRows;

        currentRows.push(data);
        draftData.data.count += 1;
        draftData.data.rows = currentRows;
      })
    );
  };
}

function updateMessageInternalChat(
  data: MessageDto,
  tempMessageId: string,
  endpointName: any,
  arg?: Partial<FindAllMessageDto>
) {
  return (dispatch: AppDispatch) => {
    dispatch(
      internalChatApi.util.updateQueryData(endpointName, arg, (draftData: any) => {
        const idx = findIndex(draftData.data.rows || [], {
          messageId: tempMessageId
        });
        if (idx !== -1) {
          draftData.data.rows[idx] = {
            ...data
          };
        }
      })
    );
  };
}

function updateLastMessageConversationInternalChat(
  data: MessageDto,
  endpointName: any,
  arg?: Partial<FindAllMessageDto>
) {
  return (dispatch: AppDispatch) => {
    dispatch(
      internalChatApi.util.updateQueryData(endpointName, arg, (draftData: any) => {
        draftData.data.lastMessage = { ...data };
      })
    );
  };
}

async function addMetadataToMessages(rows: MessageDto[]) {
  return await Promise.all(
    rows.map(async (row) => {
      if (row.content && row.content.length > 0) {
        return await addMetadataMessage(row);
      }
      return row;
    })
  );
}

async function addMetadataMessage(message: MessageDto) {
  const urls = extractUrls(message.content);
  if (urls.length > 0) {
    const metadataTag = await fetchMetadata(urls[0]);
    if (metadataTag) {
      const metadata = convertMetadata(metadataTag);
      return { ...message, metadata };
    }
  }
  return message;
}

export {
  updateLastMessageConversationInternalChat,
  addMessageInternalChat,
  updateMessageInternalChat,
  addMetadataMessage
};

export const {
  useGetInternalChatCountUnreadQuery,
  useLazyGetConversationsQuery,
  useCreatePrivateConversationMutation,
  useCreateGroupConversationMutation,
  useUpdateGroupConversationMutation,
  useDeleteGroupConversationMutation,
  useSendMessageMutation,
  useLazyGetInternalChatMessagesQuery,
  useGetInternalChatMessagesQuery,
  useUpdateMessageMutation,
  useGetConversationsQuery,
  useGetConversationDetailQuery,
  useForwardMessageMutation,
  useLazyGetInternalChatQuery,
  useReadAllMessageMutation,
  useReadMessagesMutation,
  useAddGroupConversationParticipantsMutation,
  useLeaveGroupConversationMutation,
  useRemoveGroupConversationParticipantMutation,
  useUpdateGroupConversationAdminMutation,
  useReplyMessageMutation
} = internalChatApi;
