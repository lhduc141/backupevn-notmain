import {
  ConversationDto,
  JoinConversationDto,
  MessageDto,
  OutConversationDto,
  SendMessageDto,
  TypingDto,
  UserTypingDto
} from 'types';
import { CHAT_SOCKET_EVENT, configuration, LOCAL_STORAGE_KEY, SocketClient } from 'utils';
import { addMetadataMessage } from './internal-chat.api';
import * as _ from 'lodash';

let joinedConversationIds: string[] = [];
export const internalChatSocketClient = new SocketClient({
  uri: configuration.CHAT_SOCKET_URL || '',
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  }
});

internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.CONNECT, () => {
  joinedConversationIds.forEach((conversationId) => {
    joinConversation({ conversationId: conversationId });
  });
});

export async function connectInternalChatSocket() {
  internalChatSocketClient.connect();
}
export async function disconnectInternalChatSocket() {
  internalChatSocketClient.disconnect();
}

export function onIncrementUnreadCount(callback: (data: number) => void) {
  internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.INCREMENT_UNREAD_COUNT, (data) => {
    callback(data);
  });
}
export function offIncrementUnreadCount() {
  internalChatSocketClient.socket.off(CHAT_SOCKET_EVENT.INCREMENT_UNREAD_COUNT);
}

/** conversations */
export function onReceiveConversation(callback: (data: ConversationDto) => void) {
  internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.RECEIVE_CONVERSATION, (data) => {
    callback(data);
  });
}
export function offReceiveConversation() {
  internalChatSocketClient.socket.off(CHAT_SOCKET_EVENT.RECEIVE_CONVERSATION);
}
export function joinConversation(joinConversationDto: JoinConversationDto) {
  internalChatSocketClient.socket.emit(CHAT_SOCKET_EVENT.JOIN_CONVERSATION, joinConversationDto);
  joinedConversationIds = _.uniq([...joinedConversationIds, joinConversationDto.conversationId]);
}
export function leaveConversation(leaveConversationDto: OutConversationDto) {
  internalChatSocketClient.socket.emit(CHAT_SOCKET_EVENT.LEAVE_CONVERSATION, leaveConversationDto);
  joinedConversationIds = joinedConversationIds.filter(
    (conversationId) => conversationId !== leaveConversationDto.conversationId
  );
}

/** messages */
export function onReceiveMessage(callback: (data: MessageDto) => void) {
  internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.RECEIVE_MESSAGE, async (data) => {
    const message = await addMetadataMessage(data);
    callback(message);
  });
}
export function offReceiveMessage() {
  internalChatSocketClient.socket.off(CHAT_SOCKET_EVENT.RECEIVE_MESSAGE);
}

/** send mess */
export function sendMessage(sendMessageDto: SendMessageDto) {
  internalChatSocketClient.socket.emit(CHAT_SOCKET_EVENT.SEND_MESSAGE, sendMessageDto);
}

/** typing */
export function typingInternalChat(typingDto: TypingDto) {
  internalChatSocketClient.socket.emit(CHAT_SOCKET_EVENT.TYPING, typingDto);
}
export function onInternalChatTyping(callback: (data: UserTypingDto) => void) {
  internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.USER_TYPING, callback);
}
export function offInternalChatTyping() {
  internalChatSocketClient.socket.off(CHAT_SOCKET_EVENT.USER_TYPING);
}

/**leave group conversation */
export function onLeaveGroupConversation(callback: (conversationId: string) => void) {
  internalChatSocketClient.socket.on(CHAT_SOCKET_EVENT.LEAVED_CONVERSATION, callback);
}
export function offLeaveGroupConversation() {
  internalChatSocketClient.socket.off(CHAT_SOCKET_EVENT.LEAVED_CONVERSATION);
}
