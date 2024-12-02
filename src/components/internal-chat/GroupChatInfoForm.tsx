import { Form, FormInstance, Input, Spin } from 'antd';
import { FormItem, message } from 'components/common';
import { internalChatMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetConversationDetailQuery, useUpdateGroupConversationMutation } from 'services';
import { UpdateGroupConversationDto } from 'types';
import { internalChatValidationRules } from 'utils';

export type GroupChatInfoFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  conversationId: string;
  refetchOnMountOrArgChange?: boolean;
};

export type GroupChatInfoFormRefProps = {
  form: FormInstance<GroupChatInfoFormType>;
  isLoading: boolean;
};

export type GroupChatInfoFormType = Pick<UpdateGroupConversationDto, 'name'>;
const GroupChatInfoForm = forwardRef<GroupChatInfoFormRefProps, GroupChatInfoFormProps>(
  ({ onChangeLoading, onCreateSuccess, conversationId, refetchOnMountOrArgChange = true }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: conversation, isLoading: isLoadingDetail } = useGetConversationDetailQuery(conversationId, {
      refetchOnMountOrArgChange
    });

    useEffect(() => {
      if (conversation && conversationId) {
        form.setFieldsValue(conversation.data);
      }
    }, [conversation, conversationId]);

    const [form] = Form.useForm<GroupChatInfoFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateGroupConversationMutation();

    const onFinish = async (values: GroupChatInfoFormType) => {
      onUpdate({
        conversationId: conversationId,
        ...values
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
        name='groupChatInfoForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <Spin spinning={isLoadingDetail || isLoadingUpdate}>
          <FormItem.FloatLabel<GroupChatInfoFormType>
            name='name'
            rules={internalChatValidationRules.name}
            label={internalChatMessages.groupName}
            className='mb-0'
          >
            <Input />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default GroupChatInfoForm;
