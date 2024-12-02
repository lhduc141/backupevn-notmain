import { useContext } from 'react';
import { InternalChatContext, InternalChatContextProps } from './InternalChatProvider';

export const useChatContext = (): InternalChatContextProps => {
  const context = useContext(InternalChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
