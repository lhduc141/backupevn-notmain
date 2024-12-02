import { Col, Modal, Row, Spin } from 'antd';
import { Loadable } from 'components/common';
import { lazy, useEffect, useState } from 'react';
import { offReceiveConversation, offReceiveMessage, useCreatePrivateConversationMutation } from 'services';
import { useGetConversationDetailQuery } from 'services';

type InternalChatModalProps = {
  open?: boolean;
  onCancel?: () => void;
};
const InternalChatConversationList = lazy(() => import('./InternalChatConversationList'));
const InternalChatConversation = lazy(() => import('./InternalChatConversation'));
const InternalChatProvider = lazy(() => import('../../contexts/internal-chat/InternalChatProvider'));

const InternalChatModal: React.FC<InternalChatModalProps> = ({ open, onCancel }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();

  const handleCancelModal = () => {
    onCancel?.();
  };

  useEffect(() => {
    if (!selectedConversationId) {
      offReceiveConversation();
      offReceiveMessage();
    }
  }, [selectedConversationId]);

  const [onCreatePrivate] = useCreatePrivateConversationMutation();

  const {
    data: conversationDetailRes,
    endpointName,
    isFetching
  } = useGetConversationDetailQuery(selectedConversationId!, {
    skip: !selectedConversationId,
    refetchOnMountOrArgChange: true
  });

  const handleTagClick = (userId: number) => {
    onCreatePrivate({
      userId: userId
    })
      .unwrap()
      .then((rs) => {
        setSelectedConversationId?.(rs.data.conversationId);
      });
  };
  return (
    <Modal
      maskClosable={false}
      footer={null}
      prefixCls='internal-chat-modal'
      width='80vw'
      open={open}
      onCancel={handleCancelModal}
      title
      destroyOnClose
    >
      <Row wrap={false}>
        <Col flex={'400px'} className='flex min-h-[calc(80vh-44px)] border-r border-colorBorderInput'>
          <Spin spinning={isFetching}>
            <Loadable>
              <InternalChatConversationList
                selectedConversationId={selectedConversationId}
                onSelectConversation={(data) => setSelectedConversationId(data?.conversationId)}
              />
            </Loadable>
          </Spin>
        </Col>
        <Col flex={'auto'} className='min-h-[calc(80vh-44px)] bg-colorBgChat'>
          <Spin spinning={isFetching}>
            {open &&
              conversationDetailRes?.data &&
              selectedConversationId === conversationDetailRes?.data.conversationId && (
                <div key={selectedConversationId} className='h-full max-h-full bg-colorBgChat'>
                  <Loadable>
                    <InternalChatProvider
                      handleTagClick={handleTagClick}
                      endpointName={endpointName}
                      conversation={conversationDetailRes?.data}
                    >
                      <Loadable>
                        <InternalChatConversation
                          key={selectedConversationId}
                          conversationId={selectedConversationId}
                          onClose={() => setSelectedConversationId(undefined)}
                        />
                      </Loadable>
                    </InternalChatProvider>
                  </Loadable>
                </div>
              )}
          </Spin>
        </Col>
      </Row>
    </Modal>
  );
};
export default InternalChatModal;
