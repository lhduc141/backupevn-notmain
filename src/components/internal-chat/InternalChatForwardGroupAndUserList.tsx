import { Button, Space, Spin, Typography } from 'antd';
import { MailIcon } from 'assets';
import { Avatar, InputSearchV2 } from 'components/common';
import { useLazyInternalChat, useLazyUsersOptions } from 'hooks';
import { internalChatMessages, usersMessages } from 'messages';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useForwardMessageMutation } from 'services';
import { twMerge } from 'tailwind-merge';
import { ConversationDto, MessageDto, UserCompactDto } from 'types';
import { CONVERSATION_TYPE } from 'utils';

type InternalChatForwardGroupAndUserListProps = {
  message: MessageDto;
};

const InternalChatForwardGroupAndUserList: React.FC<InternalChatForwardGroupAndUserListProps> = ({ message }) => {
  const [keyword, setKeyword] = useState('');
  const [fetchedUser, setFetchedUser] = useState(false);
  const [forwardedIds, setForwardedIds] = useState<Array<string | number>>([]);

  const [forwardMessage, { isLoading }] = useForwardMessageMutation();
  const {
    fetchData: fetchUsers,
    handleLoadMore: loadMoreUser,
    hasMore: hasMoreUser,
    data: usersOptions,
    isLoading: isLoadingUser,
    clearData: clearUsers
  } = useLazyUsersOptions();
  const {
    fetchData: fetchConversations,
    handleLoadMore: loadMoreConversation,
    hasMore: hasMoreConversation,
    data: conversations,
    isLoading: isLoadingGroups
  } = useLazyInternalChat();

  useEffect(() => {
    fetchConversations({
      type: CONVERSATION_TYPE.GROUP
    });
  }, []);
  const handleSearch = (val: string) => {
    setKeyword(val);
    setFetchedUser(false);

    clearUsers();

    fetchConversations({
      keyword: val,
      skip: 0
    });
  };
  const onLoadMore = () => {
    if (hasMoreConversation) {
      loadMoreConversation();
    } else {
      if (!fetchedUser) {
        fetchUsers({
          keyword
        });
        setFetchedUser(true);
        return;
      }
      if (hasMoreUser) {
        loadMoreUser();
      }
    }
  };

  const onForwardGroup = (conversationId: string) => {
    forwardMessage({
      conversationId,
      messageId: message.messageId
    }).then(() => {
      setForwardedIds([...forwardedIds, conversationId]);
    });
  };

  const onForwardUser = (receiverId: number) => {
    forwardMessage({
      receiverId,
      messageId: message.messageId
    }).then(() => {
      setForwardedIds([...forwardedIds, receiverId]);
    });
  };
  return (
    <div className={twMerge('flex max-h-full flex-col px-6 pt-0')}>
      <InputSearchV2
        className='mb-4'
        placeholder={internalChatMessages.contactName}
        onChange={(e) => handleSearch(e.toString())}
      />
      <div className='pb-6'>
        {conversations.length > 0 && (
          <>
            <Typography.Title level={5}>{internalChatMessages.group}</Typography.Title>
            <Spin spinning={isLoadingGroups}>
              {conversations.map((conversation: ConversationDto, idx: number) => (
                <div onClick={() => {}} className='flex h-18 items-center gap-4' key={conversation.conversationId}>
                  <Avatar name={conversation.name} fileId={conversation.image} size={48} />
                  <Typography.Paragraph className='mb-0 max-w-[250px] font-semibold' ellipsis={{ rows: 2 }}>
                    {conversation.name}
                  </Typography.Paragraph>
                  {forwardedIds.includes(conversation.conversationId) ? (
                    <Space size={4} className='ml-auto'>
                      <MailIcon />
                      <Typography.Text>{internalChatMessages.sent}</Typography.Text>
                    </Space>
                  ) : (
                    <Button
                      loading={isLoading}
                      type='link'
                      className='ml-auto text-sm no-underline'
                      onClick={() => {
                        onForwardGroup(conversation.conversationId);
                      }}
                    >
                      {internalChatMessages.send}
                    </Button>
                  )}
                </div>
              ))}
            </Spin>
          </>
        )}

        {usersOptions.length > 0 && (
          <>
            <Typography.Title level={5}>{internalChatMessages.contacts}</Typography.Title>
            <Spin spinning={isLoadingUser}>
              {usersOptions.map((user: UserCompactDto, idx: number) => (
                <div onClick={() => {}} className='flex h-18 items-center gap-4' key={user.userId}>
                  <Avatar name={user.fullName} fileId={user.avatar} size={48} />
                  <Typography.Paragraph className='mb-0 max-w-[250px] font-semibold' ellipsis={{ rows: 2 }}>
                    {user.fullName}
                  </Typography.Paragraph>

                  {forwardedIds.includes(user.userId) ? (
                    <Space size={4} className='ml-auto'>
                      <MailIcon />
                      <Typography.Text>{internalChatMessages.sent}</Typography.Text>
                    </Space>
                  ) : (
                    <Button
                      type='link'
                      onClick={() => {
                        onForwardUser(user.userId);
                      }}
                      className='ml-auto text-sm no-underline'
                    >
                      {internalChatMessages.send}
                    </Button>
                  )}
                </div>
              ))}
            </Spin>
          </>
        )}
        {(hasMoreUser || hasMoreConversation || !fetchedUser) && (
          <InView
            className='absolute top-[20px] h-0 w-full'
            as='div'
            onChange={(inView) => inView && onLoadMore()}
          ></InView>
        )}
      </div>
    </div>
  );
};

export default InternalChatForwardGroupAndUserList;
