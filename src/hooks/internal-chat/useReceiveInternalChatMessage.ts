import { useProfile } from 'hooks/auth';
import { findIndex, sumBy, uniqBy } from 'lodash';
import { ConversationDto, MessageDto } from 'types';
import { MessagePosition } from 'types/message-position.type';
import {
  calculateHeightMessageItem,
  CONVERSATION_TYPE,
  getPositionsMessageItems,
  MESSAGE_LIMIT_CURRENT,
  MESSAGE_LIMIT_LOAD,
  MESSAGE_SPACING,
  MESSAGE_SPACING_END,
  MESSAGE_SPACING_LARGE
} from 'utils';
export function useReceiveInternalChatMessage(conversation: ConversationDto) {
  const { profile } = useProfile();

  const handleReceiveOlderMessageList = (
    messageList: MessageDto[],
    firstMessage?: MessageDto | null,
    positionList?: MessagePosition[]
  ) => {
    let newMessages = [...messageList];
    let currentPositions = [...(positionList || [])];

    /** Cắt danh sách nếu số tin nhắn hơn giớn hạn */
    currentPositions =
      currentPositions.length >= MESSAGE_LIMIT_CURRENT
        ? currentPositions.slice(0, -MESSAGE_LIMIT_LOAD)
        : currentPositions;

    /** Thêm tin nhắn hiện tại đầu tiên vào tin nhắn được thêm  để tính chính xác height*/
    if (firstMessage) {
      newMessages.push(firstMessage);
    }

    /** Tính chiều cao và danh sách vị trí của list tin nhắn mới */
    const dataCalculate = getPositionsMessageItems(newMessages, conversation, profile?.userId);
    let loadedPosition = dataCalculate.positions;
    const lastIdxLoaded = loadedPosition.length - 1;

    const firstMessagePositions = currentPositions?.[0];
    const removedHeight = firstMessagePositions ? firstMessagePositions.height + firstMessagePositions.position : 0;

    /** Cập nhật spacing của tin nhắn đầu tiên đã thêm ở trên */
    if (
      firstMessagePositions?.spacing !== loadedPosition[lastIdxLoaded]?.spacing &&
      loadedPosition[lastIdxLoaded]?.messageId === firstMessagePositions?.messageId
    ) {
      const disparitySpacing = loadedPosition[lastIdxLoaded].spacing - firstMessagePositions.spacing;
      loadedPosition[lastIdxLoaded].height -= disparitySpacing;
      loadedPosition[lastIdxLoaded].spacing = firstMessagePositions.spacing;
    }

    let loadedHeight = sumBy(loadedPosition, (o) => o.height);

    /** Tính lại vị trí của các tin nhắn hiện tại */
    const positionsAfterRemovedFirst = currentPositions
      ? currentPositions.slice(-currentPositions.length - 2).map((pos) => ({
          ...pos,
          /** Đẩy vị trí của các tin nhắn hiện tại  */
          position: pos.position + (loadedHeight - removedHeight)
        }))
      : [];

    if (loadedHeight) {
      /** Thêm đoạn tin nhắn vào đầu tin nhắn hiện tại */
      let newPositions = [...loadedPosition, ...positionsAfterRemovedFirst];

      /** Tính lại tổng chiều cao của message box */
      newPositions = uniqBy(newPositions, (o) => o.messageId);
      const totalHeight = sumBy(newPositions, (o) => o.height);
      return {
        height: totalHeight + MESSAGE_SPACING_END,
        positions: uniqBy(newPositions, (o) => o.messageId),
        changedHeight: loadedHeight - removedHeight
      };
    }
    return null;
  };

  const handleReceiveNewerMessageList = (
    messageList: MessageDto[],
    lastMessage?: MessageDto | null,
    positionList?: MessagePosition[]
  ) => {
    let currentPositions = positionList ?? [];

    // /** Cắt danh sách nếu số tin nhắn hơn giớn hạn */
    const removedPositions =
      positionList && positionList.length >= MESSAGE_LIMIT_CURRENT ? positionList.slice(0, MESSAGE_LIMIT_LOAD) : [];
    const removedHeight = sumBy(removedPositions, (o) => o.height) ?? 0;

    currentPositions =
      currentPositions.length >= MESSAGE_LIMIT_CURRENT
        ? currentPositions.slice(MESSAGE_LIMIT_LOAD).map((o) => ({ ...o, position: o.position - removedHeight }))
        : currentPositions;

    let newMessages = [...messageList];
    if (lastMessage) newMessages.unshift(lastMessage);

    const message = messageList[0];

    /** Tính chiều cao và danh sách vị trí của tin nhắn mới */
    const dataCalculate = getPositionsMessageItems(newMessages, conversation, profile?.userId);
    let loadedPositions = dataCalculate.positions;
    let loadedHeight = dataCalculate.height;

    if (loadedHeight) {
      /** Giảm khoảng cách tin nhắn cuối hiện tại nếu 2 tin nhắn cùng một người gửi */
      const lastIdx = findIndex(currentPositions, {
        messageId: lastMessage?.messageId
      });
      if (lastMessage?.senderId === message?.senderId && currentPositions[lastIdx]?.height) {
        currentPositions[lastIdx].height -= MESSAGE_SPACING_LARGE - MESSAGE_SPACING;
      }

      const currentPositionsHeight = sumBy(currentPositions, (o) => o.height);
      const firstLoadedPositionsHeight =
        lastMessage && lastMessage.messageId === loadedPositions[0].messageId ? loadedPositions[0]?.height : 0;
      loadedPositions =
        lastMessage && lastMessage.messageId === loadedPositions[0].messageId
          ? loadedPositions.slice(1)
          : loadedPositions;

      currentPositions = [
        ...currentPositions,
        ...loadedPositions.map((o) => ({
          ...o,
          position: o.position + currentPositionsHeight - firstLoadedPositionsHeight
        }))
      ];
      /** Tính lại tổng chiều cao của message box */
      currentPositions = uniqBy(currentPositions, (o) => o.messageId);
      const totalHeight = sumBy(currentPositions, (o) => o.height);
      const changedHeight = removedPositions?.length
        ? sumBy(loadedPositions, (o) => o.height) - sumBy(removedPositions, (o) => o.height)
        : 0;
      return {
        height: totalHeight + MESSAGE_SPACING_END,
        positions: uniqBy(currentPositions, (o) => o.messageId),
        changedHeight: changedHeight,
        removedHeight
      };
    }
    return null;
  };

  const handleReceiveNewMessage = (
    message: MessageDto,
    lastMessage?: MessageDto | null,
    positionList?: MessagePosition[]
  ) => {
    let currentPositions = positionList ?? [];
    // /** Cắt danh sách nếu số tin nhắn hơn giớn hạn */
    const removedPositions =
      positionList && positionList.length >= MESSAGE_LIMIT_CURRENT ? positionList.slice(0, MESSAGE_LIMIT_LOAD) : [];
    const removedHeight = sumBy(removedPositions, (o) => o.height) ?? 0;

    currentPositions =
      currentPositions.length >= MESSAGE_LIMIT_CURRENT
        ? currentPositions.slice(MESSAGE_LIMIT_LOAD).map((o) => ({ ...o, position: o.position - removedHeight }))
        : currentPositions;

    /** Vị trí của tin nhắn cuối cùng */
    const lastIdx = findIndex(currentPositions, {
      messageId: lastMessage?.messageId
    });
    const lastItem = currentPositions[lastIdx];

    /** Tính chiều cao của tin nhắn mới nhất */
    const heightMessage = calculateHeightMessageItem(
      message,
      undefined,
      lastMessage,
      conversation?.type === CONVERSATION_TYPE.GROUP,
      profile?.userId,
      conversation?.participants.find((participant) => participant.userId === message.senderId)
    );
    if (heightMessage > 0) {
      /** Giảm khoảng cách tin nhắn cuối hiện tại nếu 2 tin nhắn cùng một người gửi */
      if (lastMessage?.senderId === message?.senderId && currentPositions[lastIdx]?.height) {
        currentPositions[lastIdx].height -= MESSAGE_SPACING_LARGE - MESSAGE_SPACING;
        currentPositions[lastIdx].spacing = MESSAGE_SPACING;
      }
      /** Thêm postion của tin nhắn mới vào list */
      currentPositions.push({
        messageId: message.messageId,
        height: heightMessage,
        position: lastItem ? lastItem.height + lastItem.position : heightMessage,
        spacing: MESSAGE_SPACING
      });

      /** Tính lại tổng chiều cao của message box */
      currentPositions = uniqBy(currentPositions, (o) => o.messageId);
      const totalHeight = sumBy(currentPositions, (o) => o.height);
      return {
        height: totalHeight + MESSAGE_SPACING_END,
        positions: uniqBy(currentPositions, (o) => o.messageId),
        removedHeight: removedHeight
      };
    }
    return null;
  };
  return {
    handleReceiveOlderMessageList,
    handleReceiveNewerMessageList,
    handleReceiveNewMessage
  };
}
