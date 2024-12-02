import { Badge, Button } from 'antd';
import { MessageIcon } from 'assets';
import { useGetInternalChatUnreadCount, usePlaySoundInternalChat } from 'hooks';
import { useEffect, useState } from 'react';
import {
  connectInternalChatSocket,
  disconnectInternalChatSocket,
  offIncrementUnreadCount,
  onIncrementUnreadCount
} from 'services';
import { twMerge } from 'tailwind-merge';
import InternalChatModal from './InternalChatModal';

type InternalChatManageProps = {};
const InternalChatManage: React.FC<InternalChatManageProps> = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { data: internalChatUnread, refetch: reCountUnread } = useGetInternalChatUnreadCount();
  const { playMessageSound } = usePlaySoundInternalChat();
  useEffect(() => {
    connectInternalChatSocket();

    return () => {
      disconnectInternalChatSocket();
    };
  }, []);
  useEffect(() => {
    if (!chatOpen)
      onIncrementUnreadCount((data) => {
        if (data && data > 0) {
          playMessageSound();
        }
      });
    return () => {
      offIncrementUnreadCount();
    };
  }, [chatOpen]);

  return (
    <>
      <Button
        id='btnInternalChat'
        onClick={() => {
          setChatOpen(true);
        }}
        icon={
          <Badge
            prefixCls='header-badge'
            offset={[-5, 5]}
            dot={!!internalChatUnread}
            size='small'
            count={internalChatUnread && internalChatUnread > 0}
          >
            <MessageIcon height={20} width={20} />
          </Badge>
        }
        type='text'
        shape='circle'
        className={twMerge('h-10 w-10', chatOpen && 'active-btn')}
      />
      <InternalChatModal
        onCancel={() => {
          setChatOpen(false);
          reCountUnread();
        }}
        open={chatOpen}
      />
    </>
  );
};
export default InternalChatManage;
