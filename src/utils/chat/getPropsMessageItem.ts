import dayjs from 'dayjs';
import { MessageDto } from 'types';
import { MESSAGE_TYPE } from 'utils/enums';

export const getPropsMessageItem = (
  message: MessageDto,
  nextMess?: MessageDto | null,
  prevMess?: MessageDto | null
) => {
  return {
    isOnSameDate: prevMess ? dayjs(message.sentAt).isSame(prevMess.sentAt, 'date') : false,
    isLastOfSender: nextMess ? message.senderId !== nextMess?.senderId || nextMess.type === MESSAGE_TYPE.SYSTEM : true,
    isFirstOfSender: prevMess ? message.senderId !== prevMess?.senderId || prevMess.type !== MESSAGE_TYPE.TEXT : true
  };
};
