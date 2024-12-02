import { List, ModalProps } from 'antd';
import { Avatar, InputSearchV2, message, Modal } from 'components/common';
import { useProfile } from 'hooks';
import { internalChatMessages } from 'messages';
import { useEffect, useState } from 'react';
import {
  useGetConversationDetailQuery,
  useRemoveGroupConversationParticipantMutation,
  useUpdateGroupConversationAdminMutation
} from 'services';
import ParticipantActions from './ParticipantActions';
import { ConversationParticiPantDto } from 'types';

type ManageParticipantsModalProps = ModalProps & {
  conversationId: string;
  onClose?: () => void;
};

const ManageParticipantsModal: React.FC<ManageParticipantsModalProps> = ({ conversationId, onClose, ...props }) => {
  const { profile } = useProfile();
  const [keyword, setKeyword] = useState('');

  const { data: conversationDetailRes, isLoading } = useGetConversationDetailQuery(conversationId, {
    refetchOnMountOrArgChange: true
  });

  const [onRemove, { isLoading: isLoadingRemove }] = useRemoveGroupConversationParticipantMutation();
  const [onUpdateAdmin, { isLoading: isLoadingUpdateAdmin }] = useUpdateGroupConversationAdminMutation();

  const conversationInfo = conversationDetailRes?.data;
  const participants = conversationInfo?.participants.filter((p) => !p.deletedAt) || [];

  useEffect(() => {
    if (!props.open) {
      setKeyword('');
    }
  }, [props.open]);

  const handlePromote = (data: ConversationParticiPantDto) => {
    onUpdateAdmin({
      conversationId: conversationId,
      adminId: data.userId
    })
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
        onClose?.();
      });
  };

  const handleDelete = (data: ConversationParticiPantDto) => {
    onRemove({
      conversationId: conversationId,
      participantId: data.userId
    })
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
        onClose?.();
      });
  };

  return (
    <Modal.Small
      {...props}
      maskClosable={false}
      centered
      width={568}
      title={internalChatMessages.manageParticipants}
      footer={null}
      destroyOnClose
    >
      <div className='mb-6 px-6'>
        <InputSearchV2
          className='mb-3'
          placeholder={internalChatMessages.participantName}
          onChange={(e) => setKeyword(e.toString())}
        />
        <List
          split={false}
          loading={isLoading}
          dataSource={participants.filter((p) => p.name?.toLowerCase()?.includes(keyword.toLowerCase()))}
          renderItem={(item) => (
            <List.Item
              extra={
                profile?.userId !== item.userId ? (
                  <ParticipantActions
                    user={item}
                    isLoading={isLoadingRemove || isLoadingUpdateAdmin}
                    onPromote={handlePromote}
                    onDelete={handleDelete}
                  />
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
      </div>
    </Modal.Small>
  );
};

export default ManageParticipantsModal;
