import { ConversationDto, MessageDto } from 'types';
import { MessagePosition } from 'types/message-position.type';
import { CONVERSATION_TYPE } from 'utils/enums';
import { calculateHeightMessageItem } from './calculateHeightMessageItem';
import { MESSAGE_SPACING, MESSAGE_SPACING_LARGE } from 'utils/constants';

export const getPositionsMessageItems = (
  messages: MessageDto[],
  conversation?: ConversationDto,
  profileId?: number
): {
  positions: MessagePosition[];
  height: number;
} => {
  if (messages.length > 0) {
    let arrPositions = new Array(messages.length).fill({
      height: 50
    });
    let totalHeight = 0;

    messages.forEach((message, index) => {
      const nextMess = messages[index + 1];
      const prevMess = messages[index - 1];
      const sender = conversation?.participants.find((participant) => participant.userId === message.senderId);
      const isGroup = conversation?.type === CONVERSATION_TYPE.GROUP;
      const heightMessage = calculateHeightMessageItem(message, nextMess, prevMess, isGroup, profileId, sender);
      /** Khoảng cách giữa các tin nhắn của cùng người gửi hay khác người gửi */
      const spacing = message.senderId !== nextMess?.senderId ? MESSAGE_SPACING_LARGE : MESSAGE_SPACING;

      const prevItem = arrPositions[index - 1];
      totalHeight += heightMessage;

      const position = prevItem ? (prevItem.position ? prevItem.position + prevItem.height : prevItem.height) : 0;
      arrPositions[index] = {
        messageId: message.messageId,
        height: heightMessage,
        position,
        spacing
      };
    });
    return {
      positions: arrPositions,
      height: totalHeight
    };
  }
  return {
    positions: [],
    height: 0
  };
};
