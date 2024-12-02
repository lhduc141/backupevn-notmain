import { List, Typography } from 'antd';
import { Avatar, InputSearchV2 } from 'components/common';
import { useUsersOptions } from 'hooks';
import { usersMessages } from 'messages';
import VirtualList from 'rc-virtual-list';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { UserCompactDto } from 'types';

type UserListProps = {
  onClickItem?: (value: UserCompactDto) => void;
  className?: string;
  renderItem?: (item: UserCompactDto) => ReactNode;
  placeholder?: string;
};

const UserList: React.FC<UserListProps> = ({ onClickItem, className, renderItem, placeholder }) => {
  const [keyword, setKeyword] = useState('');

  const { usersOptions, handleLoadMore, isLoading, resetPage } = useUsersOptions({
    keyword
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <= 1) {
      handleLoadMore();
    }
  };

  return (
    <div className={twMerge('flex max-h-full flex-col px-6 pt-5', className)}>
      <InputSearchV2
        className='mb-2'
        placeholder={placeholder ?? usersMessages.fullName}
        onChange={(e) => handleSearch(e.toString())}
      />
      <List loading={isLoading} className='-mx-6 max-h-[calc(100%-48px)] overflow-auto pb-6'>
        <VirtualList itemKey='userId' data={usersOptions} fullHeight onScroll={onScroll}>
          {(item: UserCompactDto) =>
            renderItem ? (
              renderItem(item)
            ) : (
              <List.Item
                key={item.userId}
                className='cursor-pointer px-5 hover:bg-colorBgIconHover'
                onClick={() => onClickItem?.(item)}
              >
                <List.Item.Meta
                  avatar={<Avatar size={48} fileId={item.avatar} name={item.fullName} />}
                  title={
                    <Typography.Title level={5} className='m-0'>
                      {item.fullName}
                    </Typography.Title>
                  }
                  description={item.fullName}
                />
              </List.Item>
            )
          }
        </VirtualList>
      </List>
    </div>
  );
};

export default UserList;
