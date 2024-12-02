import { ConversationParticiPantDto, MessageDto } from 'types';
import {
  MESSAGE_DATE_HEIGHT,
  MESSAGE_FILE_HEIGHT,
  MESSAGE_IMAGE_HEIGHT_LARGE,
  MESSAGE_REPLY_HEIGHT_IN_FILE,
  MESSAGE_REPLY_HEIGHT_IN_IMAGE,
  MESSAGE_REPLY_HEIGHT_IN_TEXT,
  MESSAGE_SPACING,
  MESSAGE_SPACING_LARGE
} from 'utils/constants';
import { MESSAGE_REF_TYPE, MESSAGE_TYPE } from 'utils/enums';
import { calculateHeightMessageImage } from './calculateMessageImage';
import { calculateHeightMessageList } from './calculateMessageImageList';
import { calculateHeightMessageSystem } from './calculateMessageSystem';
import { calculateHeightMessageText } from './calculateMessageText';
import { getPropsMessageItem } from './getPropsMessageItem';

export const calculateHeightMessageItem = (
  message: MessageDto,
  nextMess?: MessageDto | null,
  prevMess?: MessageDto | null,
  isGroup?: boolean,
  profileId?: number,
  sender?: ConversationParticiPantDto
): number => {
  let heightMessage = 0;

  const { isFirstOfSender, isOnSameDate } = getPropsMessageItem(message, nextMess, prevMess);
  const isMe = message.senderId === profileId;
  const isReply = Boolean(message.refType === MESSAGE_REF_TYPE.REPLY && message.refMessage);

  switch (message.type) {
    case MESSAGE_TYPE.SYSTEM:
      heightMessage = calculateHeightMessageSystem(message, {
        isGroup,
        isMe,
        isFirstOfSender,
        sender
      });
      break;

    case MESSAGE_TYPE.TEXT:
      heightMessage = calculateHeightMessageText(message, {
        isGroup,
        isMe,
        isFirstOfSender
      });

      if (isReply) {
        heightMessage += MESSAGE_REPLY_HEIGHT_IN_TEXT;
      }

      break;

    case MESSAGE_TYPE.IMAGE:
      if (!message.fileId) {
        heightMessage = MESSAGE_IMAGE_HEIGHT_LARGE;
      } else if (typeof message.fileId === 'number') {
        heightMessage = calculateHeightMessageImage(message);
      } else if (Array.isArray(message.fileId)) {
        heightMessage =
          message.fileId.length === 1
            ? calculateHeightMessageImage(message)
            : calculateHeightMessageList(message.fileId, message);
      }
      if (isReply) {
        heightMessage += MESSAGE_REPLY_HEIGHT_IN_IMAGE;
      }

      break;

    case MESSAGE_TYPE.FILE:
      if (typeof message.fileId === 'number') {
        heightMessage = MESSAGE_FILE_HEIGHT;
      } else if (Array.isArray(message.fileId)) {
        heightMessage =
          message.fileId.length === 1
            ? MESSAGE_FILE_HEIGHT
            : MESSAGE_FILE_HEIGHT * message.fileId.length + (message.fileId.length - 1) * 6;
      }
      if (isReply) {
        heightMessage += MESSAGE_REPLY_HEIGHT_IN_FILE;
      }
      break;
  }

  /** Chiều cao của ngày gửi tin nhắn khác ngày nhau */
  heightMessage += !isOnSameDate ? MESSAGE_DATE_HEIGHT : 0;

  /** Khoảng cách giữa các tin nhắn của cùng người gửi hay khác người gửi */
  heightMessage += message.senderId !== nextMess?.senderId ? MESSAGE_SPACING_LARGE : MESSAGE_SPACING;

  return heightMessage;
};
