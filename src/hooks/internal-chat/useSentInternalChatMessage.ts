import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessageInternalChat,
  updateLastMessageConversationInternalChat,
  updateMessageInternalChat,
  useReplyMessageMutation,
  useSendMessageMutation
} from 'services';
import { AppDispatch } from 'store';
import { CreateMessageDto, FileUpload, MessageDto, ReplyMessageDto } from 'types';
import { MESSAGE_REF_TYPE } from 'utils';
import { useUploadForm } from 'hooks/useUploadForm';
export function useSentInternalChatMessage(
  conversationId: string,
  endpointNameConversation?: string,
  endpointNameMessages?: string
) {
  const dispatch = useDispatch<AppDispatch>();
  const { handleMultiUpload } = useUploadForm();

  const [sendMessage] = useSendMessageMutation();
  const [replyMessage] = useReplyMessageMutation();

  const dispatchAddMessage = useCallback(
    (data: MessageDto) => {
      if (endpointNameMessages) dispatch(addMessageInternalChat(data, endpointNameMessages, { conversationId }));
    },
    [endpointNameMessages]
  );

  const dispatchUpdateMessage = useCallback(
    (data: MessageDto, tempMessageId: string) => {
      if (endpointNameMessages)
        dispatch(updateMessageInternalChat(data, tempMessageId, endpointNameMessages, { conversationId }));
    },
    [endpointNameMessages]
  );

  const dispatchUpdateLastMessageConversation = useCallback(
    (data: MessageDto) => {
      if (endpointNameConversation) dispatch(updateLastMessageConversationInternalChat(data, endpointNameConversation));
    },
    [endpointNameConversation]
  );

  const handleAddMessage = (data: MessageDto) => {
    dispatchAddMessage(data);
  };

  const handleUpdateAddMessage = (data: MessageDto, tempMessageId: string) => {
    dispatchUpdateMessage(data, tempMessageId);
    dispatchUpdateLastMessageConversation(data);
  };

  const handleSentMessage = async (data: Omit<MessageDto, 'fileId'> & { fileId?: FileUpload[] }) => {
    const { fileId } = data;
    const uploadedOtherFiles = fileId?.length ? await handleMultiUpload(fileId) : [];

    if (data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage) {
      return handleReply({
        messageId: data.refMessage?.messageId,
        content: data.content,
        fileId: uploadedOtherFiles.length === 1 ? uploadedOtherFiles[0] : uploadedOtherFiles,
        type: data.type
      });
    } else {
      return handleSend({
        conversationId: data.conversationId,
        content: data.content,
        fileId: uploadedOtherFiles.length === 1 ? uploadedOtherFiles[0] : uploadedOtherFiles,
        type: data.type
      });
    }
  };

  const handleSend = (data: CreateMessageDto) => {
    return sendMessage({
      ...data
    }).unwrap();
  };

  const handleReply = (data: ReplyMessageDto) => {
    return replyMessage({
      ...data
    }).unwrap();
  };

  return {
    handleAddMessage,
    handleUpdateAddMessage,
    handleSentMessage
  };
}
