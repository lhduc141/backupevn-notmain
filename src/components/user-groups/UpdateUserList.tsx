import { Button, List, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Avatar } from 'components/common';
import { SelectUsers } from 'components/users';
import { messages, userGroupsMessages } from 'messages';
import { UserCompactDto } from 'types';

type UpdateUserListProps = {
  users: UserCompactDto[];
  onAdd: (data: UserCompactDto) => void;
  onRemove: (data: UserCompactDto) => void;
  organizationUnitId?: number[];
};
const UpdateUserList = ({ users, onAdd, onRemove, organizationUnitId }: UpdateUserListProps) => {
  return (
    <>
      <SelectUsers
        onSelect={(_value, record) => {
          const item = record as DefaultOptionType & UserCompactDto;
          onAdd(item);
        }}
        placeholder={userGroupsMessages.addUsers}
        className='h-14 w-full'
        value={null}
        organizationUnitId={organizationUnitId}
      />
      {users && users.length > 0 ? (
        <List
          split={false}
          className='mt-3'
          itemLayout='horizontal'
          dataSource={users}
          rowKey={(item) => item.userId!}
          renderItem={(item) => (
            <List.Item
              className='py-2'
              actions={[
                <Button
                  type='link'
                  onClick={() => {
                    onRemove(item);
                  }}
                  className='text-sm'
                >
                  {messages.deleteButtonText}
                </Button>
              ]}
            >
              <List.Item.Meta
                className='items-center'
                avatar={<Avatar size={32} name={item.fullName} fileId={item.avatar} />}
                title={<Typography.Text>{item.fullName}</Typography.Text>}
              />
            </List.Item>
          )}
        />
      ) : undefined}
    </>
  );
};

export default UpdateUserList;
