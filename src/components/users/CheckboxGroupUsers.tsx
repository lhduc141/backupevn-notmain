import { Checkbox, Skeleton, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CloseCircleIcon } from 'assets';
import { Avatar, InfiniteScroll, InputSearchV2 } from 'components/common';
import { useUsersOptions } from 'hooks';
import { uniqBy } from 'lodash';
import { usersMessages } from 'messages';
import { memo, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { UserCompactDto } from 'types';

type CheckboxGroupUsersProps = {
  className?: string;
  renderItem?: (item: UserCompactDto) => ReactNode;
  placeholder?: string;
  value?: UserCompactDto[];
  onChange?: (value?: UserCompactDto[]) => void;
  disableItemIds?: number[];
};

const CheckboxGroupUsers: React.FC<CheckboxGroupUsersProps> = ({
  value,
  onChange,
  className,
  renderItem,
  placeholder,
  disableItemIds
}) => {
  const [keyword, setKeyword] = useState('');
  const { usersOptions, handleLoadMore, isLoading, resetPage, hasMore } = useUsersOptions({
    keyword
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };

  const valueGroup = value?.map((itm) => itm.userId);

  const handleChange = (item: UserCompactDto) => (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onAdd(item);
    } else {
      onRemove(item);
    }
  };

  const onAdd = (item: UserCompactDto) => {
    const newValue = [...(value ?? []), item];
    onChange?.(uniqBy(newValue, 'userId'));
  };
  const onRemove = (item: UserCompactDto) => {
    const newValue = value?.filter((o) => o.userId !== item.userId);
    onChange?.(uniqBy(newValue, 'userId'));
  };

  const renderCheckedItem = () => {
    return value?.map((user) => {
      if (user) {
        return (
          <CheckedUser
            key={user.userId}
            onRemove={() => {
              onRemove(user as UserCompactDto);
            }}
            user={user}
          />
        );
      }
      return null;
    });
  };

  return (
    <div className={twMerge('flex max-h-full flex-col', className)}>
      <InputSearchV2
        className='mb-4'
        placeholder={placeholder ?? usersMessages.fullName}
        onChange={(e) => handleSearch(e.toString())}
      />
      {value?.length ? (
        <div className='slim-scrollbar-horizontal mb-2 mt-0 flex max-w-full gap-2 overflow-x-auto overflow-y-hidden pb-2'>
          {renderCheckedItem()}
        </div>
      ) : null}
      <Checkbox.Group value={valueGroup ?? []} className='-ml-6 w-[calc(100%+48px)]'>
        <InfiniteScroll
          className='flex-1'
          isLoading={Boolean(isLoading)}
          next={handleLoadMore}
          hasMore={Boolean(hasMore)}
          loader={
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 3
              }}
            />
          }
          endMessage={<p></p>}
        >
          {usersOptions.map((item) => (
            <label
              key={item.userId}
              className='flex h-18 w-full cursor-pointer items-center px-6 hover:bg-hoverColor1'
              htmlFor={`user-${item.userId}`}
            >
              <Checkbox
                disabled={disableItemIds?.includes(item.userId)}
                onChange={handleChange(item)}
                id={`user-${item.userId}`}
                value={item.userId}
              />
              <div className='pl-4'>
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <div className='flex w-full cursor-pointer items-center gap-4'>
                    <Avatar name={item.fullName} fileId={item.avatar} size={48} />
                    <Typography.Text className='font-semibold'>{item.fullName}</Typography.Text>
                  </div>
                )}
              </div>
            </label>
          ))}
        </InfiniteScroll>
      </Checkbox.Group>
    </div>
  );
};

const CheckedUser = memo(({ user, onRemove }: { user: UserCompactDto; onRemove: (user: UserCompactDto) => void }) => {
  return (
    <div
      key={user.userId}
      className='flex h-8 w-fit max-w-[144px] items-center gap-1 rounded-full bg-backgroundColor3 px-1'
    >
      <Avatar size={24} className='border border-white' shape='circle' fileId={user.avatar} name={user.fullName} />
      <Typography.Text className='text-sm text-white' ellipsis>
        {user.fullName}
      </Typography.Text>
      <div
        onClick={() => onRemove(user as UserCompactDto)}
        className='h-4 w-4 cursor-pointer rounded-full hover:bg-hoverColor1 hover:brightness-50'
      >
        <CloseCircleIcon />
      </div>
    </div>
  );
});

export default CheckboxGroupUsers;
