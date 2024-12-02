import { Spin, Typography } from 'antd';
import { Avatar, Modal } from 'components/common';
import { UserList } from 'components/users';
import { internalChatMessages } from 'messages';
import { useCreatePrivateConversationMutation } from 'services';
import { ConversationDto, UserCompactDto } from 'types';

type InternalChatPrivateModalProps = {
  open?: boolean;
  onSelect?: (data: ConversationDto) => void;
  onCancel?: () => void;
};
const InternalChatPrivateModal: React.FC<InternalChatPrivateModalProps> = ({ open, onSelect, onCancel }) => {
  const [onCreate, { isLoading }] = useCreatePrivateConversationMutation();
  const handleSelectUser = (user: UserCompactDto) => {
    onCreate({
      userId: user.userId
    })
      .unwrap()
      .then((rs) => {
        onSelect?.(rs.data);
      });
  };

  return (
    <Modal.Small
      destroyOnClose
      open={open}
      footer={null}
      title={internalChatMessages.contacts}
      centered
      onCancel={onCancel}
      width={568}
    >
      <Spin spinning={isLoading}>
        <UserList
          placeholder={internalChatMessages.contactName}
          className='h-[calc(100vh-200px)] px-6 pt-0'
          renderItem={(item) => (
            <div
              onClick={() => {
                handleSelectUser(item);
              }}
              className='flex h-18 cursor-pointer items-center gap-4 px-6 hover:bg-hoverColor1'
              key={item.userId}
            >
              <Avatar name={item.fullName} fileId={item.avatar} size={48} />
              <Typography.Text className='font-semibold'>{item.fullName}</Typography.Text>
            </div>
          )}
        />
      </Spin>
    </Modal.Small>
  );
};
export default InternalChatPrivateModal;
