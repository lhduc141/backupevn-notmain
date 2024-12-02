import { Form, FormInstance, Spin, Typography } from 'antd';
import { Avatar, message } from 'components/common';
import { CheckboxGroupUsers } from 'components/users';
import { internalChatMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useAddGroupConversationParticipantsMutation, useGetConversationDetailQuery } from 'services';
import { UserCompactDto } from 'types';

export type AddParticipantsFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  conversationId: string;
  refetchOnMountOrArgChange?: boolean;
};

export type AddParticipantsFormRefProps = {
  form: FormInstance<AddParticipantsFormType>;
  isLoading: boolean;
};

export type AddParticipantsFormType = {
  participants: UserCompactDto[];
};
const AddParticipantsForm = forwardRef<AddParticipantsFormRefProps, AddParticipantsFormProps>(
  ({ onChangeLoading, onCreateSuccess, conversationId, refetchOnMountOrArgChange = true }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: conversation, isLoading: isLoadingDetail } = useGetConversationDetailQuery(conversationId, {
      refetchOnMountOrArgChange
    });

    const existedParticipantIds =
      conversation?.data.participants.filter((p) => !p.deletedAt).map((p) => p.userId) || [];

    const [form] = Form.useForm<AddParticipantsFormType>();

    const [onAddParticipants, { isLoading: isLoadingUpdate }] = useAddGroupConversationParticipantsMutation();

    const onFinish = async (values: AddParticipantsFormType) => {
      onAddParticipants({
        conversationId: conversationId,
        participants: values.participants?.map((p) => p.userId)
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='addParticipantsForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        className='px-6'
      >
        <Spin spinning={isLoadingDetail || isLoadingUpdate}>
          <Form.Item<AddParticipantsFormType> name='participants' className='mb-0'>
            <CheckboxGroupUsers
              disableItemIds={existedParticipantIds}
              placeholder={internalChatMessages.contactName}
              renderItem={(item) => (
                <div className='flex w-full cursor-pointer items-center gap-4'>
                  <Avatar name={item.fullName} fileId={item.avatar} size={48} />
                  <div>
                    <Typography.Paragraph className='mb-1 font-semibold'>{item.fullName}</Typography.Paragraph>
                    {existedParticipantIds.includes(item.userId) && (
                      <Typography.Text type='secondary' className='text-sm'>
                        {internalChatMessages.participated}
                      </Typography.Text>
                    )}
                  </div>
                </div>
              )}
            />
          </Form.Item>
        </Spin>
      </Form>
    );
  }
);
export default AddParticipantsForm;
