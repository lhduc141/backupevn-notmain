import { Divider, Form, FormInstance, Input, Spin, UploadFile } from 'antd';
import { CameraIcon } from 'assets';
import { message, Upload, UploadFileItem } from 'components/common';
import { FormItem } from 'components/common/form-item';
import { ServerUploadFile } from 'components/common/upload/ServerUpload';
import { CheckboxGroupUsers } from 'components/users';
import { useUploadForm } from 'hooks';
import { internalChatMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateGroupConversationMutation } from 'services';
import { ConversationDto, CreateGroupConversationDto, UserCompactDto } from 'types';
import { createInternalChatGroupInitialValues } from 'utils/initial-values';
import { createInternalChatGroupValidationRules } from 'utils/validation-rules';
export type InternalChatGroupFormCreateProps = {
  onChangeLoading?: (value: boolean) => void;
  onSubmitSuccess?: (conversation: ConversationDto) => void;
  className?: string;
};

export type InternalChatGroupFormCreateRefProps = {
  form: FormInstance<InternalChatGroupFormCreateType>;
  isLoading: boolean;
};

export type InternalChatGroupFormCreateType = Omit<CreateGroupConversationDto, 'participants' | 'image'> & {
  image: ServerUploadFile;
  participants: UserCompactDto[];
};
const InternalChatGroupFormCreate = forwardRef<InternalChatGroupFormCreateRefProps, InternalChatGroupFormCreateProps>(
  ({ onChangeLoading, onSubmitSuccess, className }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate
    }));
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateGroupConversationMutation();
    const [form] = Form.useForm<InternalChatGroupFormCreateType>();
    const image = Form.useWatch('image', form);

    const { handleMultiUpload: handleUpload } = useUploadForm();

    const normFile = ({ file }: { file: UploadFile }) => {
      return file;
    };

    const onFinish = async ({ ...values }: InternalChatGroupFormCreateType) => {
      const iconFile = await handleUpload([values.image], []);

      const data: CreateGroupConversationDto = {
        ...values,
        participants: values.participants.map((itm) => itm.userId),
        image: iconFile[0] || undefined
      };
      onCreate(data)
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onSubmitSuccess?.(rs.data);
        });
    };

    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingCreate);
      }
    }, [onChangeLoading, isLoadingCreate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='createInternalChatGroupForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={createInternalChatGroupInitialValues}
        className={className}
      >
        <Spin spinning={isLoadingCreate}>
          <div className='flex items-center gap-6'>
            <div className='h-28 w-28'>
              <FormItem<InternalChatGroupFormCreateType>
                name='image'
                getValueFromEvent={normFile}
                rules={createInternalChatGroupValidationRules.image}
              >
                <Upload.Crop multiple={false} showUploadList={false}>
                  {!image ? (
                    <div className='hov flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-backgroundColor2 text-white hover:bg-hoverColor1'>
                      <CameraIcon />
                    </div>
                  ) : (
                    <UploadFileItem
                      file={image}
                      className='h-28 w-28 cursor-pointer overflow-hidden rounded-full p-0 hover:bg-hoverColor1 hover:brightness-50'
                    />
                  )}
                </Upload.Crop>
              </FormItem>
            </div>

            <div className='flex-1'>
              <FormItem.FloatLabel<CreateGroupConversationDto>
                name='name'
                label={internalChatMessages.name}
                rules={createInternalChatGroupValidationRules.name}
              >
                <Input className='w-full' />
              </FormItem.FloatLabel>
            </div>
          </div>
          <Divider className='my-6' />
          <FormItem<CreateGroupConversationDto>
            name='participants'
            label={internalChatMessages.participants}
            rules={createInternalChatGroupValidationRules.participants}
            hiddenLabel
          >
            <CheckboxGroupUsers placeholder={internalChatMessages.contactName} />
          </FormItem>
        </Spin>
      </Form>
    );
  }
);
export default InternalChatGroupFormCreate;
