import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setReplyMessage } from 'store/features';
import { MessageDto } from 'types';

export function useReplyInternalChatMessage() {
  const dispatch = useDispatch();

  const messageReplied = useSelector((state: RootState) => state.internalChat.replyMessage);

  const handleReplyMessage = (message: MessageDto) => {
    dispatch(setReplyMessage(message));
  };
  const handleRemoveReplyMessage = () => {
    dispatch(setReplyMessage(undefined));
  };
  return { messageReplied, handleReplyMessage, handleRemoveReplyMessage };
}
