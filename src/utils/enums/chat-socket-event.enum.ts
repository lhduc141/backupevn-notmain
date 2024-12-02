export enum CHAT_SOCKET_EVENT {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  UNAUTHORIZED = 'unauthorized',
  TOKEN_EXPIRED = 'token_expired',
  UPDATE_TOKEN = 'update_token',
  CONNECT_ERROR = 'connect_error',
  ERROR = 'error',
  EXCEPTION = 'exception',

  INCREMENT_UNREAD_COUNT = 'increment_unread_count',

  RECEIVE_CONVERSATION = 'receive_conversation',
  JOIN_CONVERSATION = 'join_conversation',
  LEAVE_CONVERSATION = 'leave_conversation',
  LEAVED_CONVERSATION = 'leaved_conversation',

  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',

  TYPING = 'typing',
  USER_TYPING = 'user_typing'
}
