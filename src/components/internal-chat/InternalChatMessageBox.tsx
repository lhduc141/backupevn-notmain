import { Loadable } from 'components/common';
import { lazy } from 'react';
import { InView } from 'react-intersection-observer';
import InternalChatUserTyping from './InternalChatUserTyping';
import { useChatContext } from 'contexts';
import { Button } from 'antd';
import { ArrowDownIcon } from 'assets';
const InternalChatMessageList = lazy(() => import('./InternalChatMessageList'));

type InternalChatMessageBoxProps = {};

const InternalChatMessageBox: React.FC<InternalChatMessageBoxProps> = () => {
  const {
    positions,
    messagesBoxRef,
    messageListRef,
    messages,
    hasMore,
    hasNew,
    onGetOlderMess,
    onGetNewerMess,
    isAtBottomScroll,
    scrollToEndMessage
  } = useChatContext();
  return (
    <>
      <div className='relative flex-grow overflow-hidden'>
        <div
          ref={messagesBoxRef}
          className='fade-scrollbar h-full'
          style={{
            overflowY: 'auto'
          }}
        >
          <div ref={messageListRef} className='relative min-h-full w-full overflow-hidden px-4'>
            {hasMore ? (
              <InView
                className='absolute h-10 w-full'
                style={{
                  top: positions[10]?.position,
                  height: positions[10]?.height
                }}
                as='div'
                onChange={(inView) => {
                  if (inView) {
                    onGetOlderMess();
                  }
                }}
              />
            ) : null}

            {hasNew ? (
              <InView
                className='absolute h-10 w-full'
                as='div'
                style={{
                  top: positions[positions.length - 10]?.position,
                  height: positions[positions.length - 10]?.height
                }}
                onChange={(inView) => {
                  if (inView) {
                    onGetNewerMess();
                  }
                }}
              />
            ) : null}
            <Loadable>
              <InternalChatMessageList messages={messages} />
            </Loadable>
          </div>
          <div className='absolute bottom-0 left-0 z-50'>
            <InternalChatUserTyping />
          </div>
        </div>
        {!isAtBottomScroll && (
          <div className='absolute bottom-4 left-1/2 z-50 -translate-x-1/2'>
            <Button onClick={scrollToEndMessage} className='h-8 w-8' shape='circle' icon={<ArrowDownIcon />}></Button>
          </div>
        )}
      </div>
    </>
  );
};

export default InternalChatMessageBox;
