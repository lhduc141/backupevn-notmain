import { Button, Divider, List, ModalProps, Typography } from 'antd';
import { ChatGroupIcon, LogoutIcon, TrashIcon } from 'assets';
import { Avatar, message, Modal } from 'components/common';
import { useProfile } from 'hooks';
import { internalChatMessages, messages } from 'messages';
import {
  useDeleteGroupConversationMutation,
  useGetConversationDetailQuery,
  useLeaveGroupConversationMutation,
  useUpdateGroupConversationMutation
} from 'services';
import { useState } from 'react';
import AddParticipantsModal from './AddParticipantsModal';
import UpdateGroupConversationModal from './UpdateGroupConversationModal';
import ManageParticipantsModal from './ManageParticipantsModal';
import { FileDto } from 'types';

const { confirm } = Modal;

type GroupConversationInfoModalProps = ModalProps & {
  conversationId: string;
  onClose?: () => void;
};

const GroupConversationInfoModal = ({ conversationId, onClose, ...props }: GroupConversationInfoModalProps) => {
  const { profile } = useProfile();
  const [openName, setOpenName] = useState(false);
  const [openAddParticipants, setOpenAddParticipants] = useState(false);
  const [openManageParticipants, setOpenManageParticipants] = useState(false);

  const { data: conversationDetailRes } = useGetConversationDetailQuery(conversationId, {
    // refetchOnMountOrArgChange: true
  });

  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteGroupConversationMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateGroupConversationMutation();
  const [onLeave, { isLoading: isLoadingLeave }] = useLeaveGroupConversationMutation();

  const conversationInfo = conversationDetailRes?.data;

  const isGroupAdmin = conversationInfo?.adminId === profile?.userId;
  const participants = conversationInfo?.participants.filter((p) => !p.deletedAt) || [];

  const handleDelete = () => {
    confirm({
      title: `${internalChatMessages.deleteGroup}`,
      content: internalChatMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(conversationId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onClose?.();
          })
          .catch();
      },
      okButtonProps: {
        loading: isLoadingDelete
      }
    });
  };

  const handleUpdateAvatar = (value: FileDto) => {
    if (value) {
      onUpdate({
        conversationId: conversationId,
        image: value.fileId
      });
    }
  };

  const handleLeave = () => {
    confirm({
      title: `${internalChatMessages.leaveGroup}`,
      content: internalChatMessages.confirmLeave,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onLeave(conversationId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onClose?.();
          })
          .catch();
      },
      okButtonProps: {
        loading: isLoadingUpdate
      }
    });
  };

  return (
    <>
      <Modal.Headless {...props} title={internalChatMessages.groupInfo} footer={null}>
        <div className='flex gap-x-6 pt-2'>
          {isGroupAdmin ? (
            <Avatar.UploadOnlyCrop
              isLoading={isLoadingUpdate}
              size={112}
              fileId={conversationInfo?.image}
              name={conversationInfo?.name}
              onUploadSuccess={handleUpdateAvatar}
            />
          ) : (
            <Avatar size={112} fileId={conversationInfo?.image} name={conversationInfo?.name} />
          )}
          <div>
            <Typography.Title className='mb-2 text-0.5xl'>{conversationInfo?.name}</Typography.Title>
            <Typography.Paragraph type='secondary' className='mb-4 text-sm'>
              {participants.length} {internalChatMessages.participants.toLowerCase()}
            </Typography.Paragraph>
            {isGroupAdmin && (
              <Button type='link' className='font-normal no-underline' onClick={() => setOpenName(true)}>
                {internalChatMessages.changeGroupName}
              </Button>
            )}
          </div>
        </div>
        <Divider className='my-5' />
        <div className='mb-5 flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <ChatGroupIcon />
            <Typography.Title className='mb-0 text-lg'>
              {participants.length} {internalChatMessages.participants.toLowerCase()}
            </Typography.Title>
          </div>
          {isGroupAdmin && (
            <div className='flex gap-x-4'>
              <Button type='link' className='font-normal no-underline' onClick={() => setOpenManageParticipants(true)}>
                {internalChatMessages.manage}
              </Button>
              <Button type='link' className='font-normal no-underline' onClick={() => setOpenAddParticipants(true)}>
                {internalChatMessages.addParticipants}
              </Button>
            </div>
          )}
        </div>
        <List
          split={false}
          itemLayout='horizontal'
          dataSource={participants}
          renderItem={(item) => (
            <List.Item
              extra={
                item.userId === conversationInfo?.adminId ? (
                  <Typography.Text type='secondary' className='text-sm italic'>
                    {internalChatMessages.groupAdmin}
                  </Typography.Text>
                ) : undefined
              }
            >
              <List.Item.Meta
                className='items-center'
                avatar={<Avatar size={48} fileId={item.image} name={item.name} />}
                title={item.name}
              />
            </List.Item>
          )}
        />
        <Divider className='my-5' />
        {isGroupAdmin ? (
          <Button danger type='text' className='-mx-4 font-normal' loading={isLoadingDelete} onClick={handleDelete}>
            <div className='flex gap-x-4'>
              <TrashIcon />
              {internalChatMessages.deleteGroup}
            </div>
          </Button>
        ) : (
          <Button danger type='text' className='-mx-4 font-normal' loading={isLoadingLeave} onClick={handleLeave}>
            <div className='flex gap-x-4'>
              <LogoutIcon />
              {internalChatMessages.leaveGroup}
            </div>
          </Button>
        )}
      </Modal.Headless>
      <UpdateGroupConversationModal
        conversationId={conversationId}
        open={openName}
        onCancel={() => setOpenName(false)}
        onClose={() => setOpenName(false)}
      />
      <AddParticipantsModal
        conversationId={conversationId}
        open={openAddParticipants}
        onCancel={() => setOpenAddParticipants(false)}
        onClose={() => setOpenAddParticipants(false)}
      />
      <ManageParticipantsModal
        conversationId={conversationId}
        open={openManageParticipants}
        onCancel={() => setOpenManageParticipants(false)}
        onClose={() => setOpenManageParticipants(false)}
      />
    </>
  );
};

export default GroupConversationInfoModal;
