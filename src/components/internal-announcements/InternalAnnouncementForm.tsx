import { Checkbox, Divider, Form, FormInstance, Input, InputNumber, Spin, Typography, UploadFile } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ArrowDownIcon } from 'assets';
import { Editor, FormItem, message, Upload } from 'components/common';
import { ServerUploadFile } from 'components/common/upload/ServerUpload';
import { TreeSelectOrganizationUnits } from 'components/organization-units';
import { useUploadForm } from 'hooks';
import { internalAnnouncementsMessages, messages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useCreateInternalAnnouncementMutation,
  useGetInternalAnnouncementDetailQuery,
  useUpdateInternalAnnouncementMutation
} from 'services';
import { twMerge } from 'tailwind-merge';
import { CreateInternalAnnouncementDto } from 'types';
import {
  createInternalAnnouncementInitialValues,
  internalAnnouncementsValidationRules,
  updateInternalAnnouncementInitialValues
} from 'utils';

export type InternalAnnouncementFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  internalAnnouncementId?: number;
  refetchOnMountOrArgChange?: boolean;
  className?: string;
};

export type InternalAnnouncementFormRefProps = {
  form: FormInstance<InternalAnnouncementFormType>;
  isLoading: boolean;
};

export type InternalAnnouncementFormType = Omit<CreateInternalAnnouncementDto, 'organizationUnitIds' | 'files'> & {
  organizationUnitIds: DefaultOptionType[];
  files: ServerUploadFile[];
};
const InternalAnnouncementForm = forwardRef<InternalAnnouncementFormRefProps, InternalAnnouncementFormProps>(
  ({ onChangeLoading, onCreateSuccess, internalAnnouncementId, refetchOnMountOrArgChange = true, className }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { handleMultiUpload } = useUploadForm();
    const { data: internalAnnouncement, isLoading: isLoadingDetail } = useGetInternalAnnouncementDetailQuery(
      internalAnnouncementId!,
      {
        skip: !internalAnnouncementId,
        refetchOnMountOrArgChange
      }
    );

    useEffect(() => {
      if (internalAnnouncement && internalAnnouncementId) {
        form.setFieldsValue({
          ...internalAnnouncement.data,
          organizationUnitIds: internalAnnouncement.data.organizationUnits?.map((org) => ({
            value: org.organizationUnitId,
            label: org.name
          })),
          files: internalAnnouncement.data.files.map((o) => ({
            uid: `file-${o}`,
            fileId: o
          }))
        });
      }
    }, [internalAnnouncement, internalAnnouncementId]);

    const [form] = Form.useForm<InternalAnnouncementFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateInternalAnnouncementMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateInternalAnnouncementMutation();

    const onFinish = async ({ ...values }: InternalAnnouncementFormType) => {
      const updateFileList = values.files;
      const filesUploaded = await handleMultiUpload(updateFileList, internalAnnouncement?.data.files);
      const data: CreateInternalAnnouncementDto = {
        ...values,
        organizationUnitIds: values.organizationUnitIds.map((o) => o.value as number),
        files: filesUploaded
      };

      if (!internalAnnouncementId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          internalAnnouncementId,
          ...data
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      }
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate || isLoadingCreate);
      }
    }, [onChangeLoading, isLoadingUpdate, isLoadingCreate]);

    const normFile = ({ fileList }: { fileList: UploadFile[] }) => {
      return fileList;
    };

    const content = Form.useWatch('content', form) || '';
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='internalAnnouncementForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={
          internalAnnouncementId ? updateInternalAnnouncementInitialValues : createInternalAnnouncementInitialValues
        }
        className={twMerge('flex w-full justify-center', className)}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <div className='flex w-full flex-col items-center'>
            <div className='w-[720px]'>
              <Typography.Title className='mb-5 text-lg'>{messages.general}</Typography.Title>

              <FormItem.FloatLabel<InternalAnnouncementFormType>
                name='title'
                rules={internalAnnouncementsValidationRules.title}
                label={internalAnnouncementsMessages.title}
              >
                <Input />
              </FormItem.FloatLabel>
              <div className='mb-4 flex w-full gap-4'>
                <FormItem.FloatLabel<InternalAnnouncementFormType>
                  name='organizationUnitIds'
                  rules={internalAnnouncementsValidationRules.organizationUnitIds}
                  label={internalAnnouncementsMessages.organizationUnit}
                  className='mb-0 w-[407px]'
                >
                  <TreeSelectOrganizationUnits
                    labelInValue
                    showCheckedStrategy='SHOW_ALL'
                    treeCheckStrictly
                    treeDefaultExpandAll
                  />
                </FormItem.FloatLabel>
                <FormItem.FloatLabel<InternalAnnouncementFormType>
                  name='priority'
                  label={internalAnnouncementsMessages.priority}
                  rules={internalAnnouncementsValidationRules.priority}
                  className='mb-0 flex-1'
                >
                  <InputNumber
                    min={1}
                    className='w-full'
                    upHandler={<ArrowDownIcon className='h-[10px] w-[10px] rotate-180' />}
                    downHandler={<ArrowDownIcon className='h-[10px] w-[10px]' />}
                  />
                </FormItem.FloatLabel>
              </div>
              <Form.Item<InternalAnnouncementFormType>
                rules={internalAnnouncementsValidationRules.isRequestConfirm}
                name='isRequestConfirm'
                valuePropName='checked'
                className='flex h-[44px] items-center'
              >
                <Checkbox>{internalAnnouncementsMessages.isRequestConfirm}</Checkbox>
              </Form.Item>

              <Divider className='mb-8 mt-6' />

              <div className='mb-8'>
                <Typography.Title level={5} className='required-field mb-5'>
                  {internalAnnouncementsMessages.content}
                </Typography.Title>

                <Editor
                  onEditorChange={(a) => {
                    form.setFieldValue('content', a);
                  }}
                  value={content}
                />
                <FormItem<InternalAnnouncementFormType>
                  name='content'
                  prefixCls='hidden'
                  label={internalAnnouncementsMessages.content}
                  rules={internalAnnouncementsValidationRules.content}
                ></FormItem>
              </div>
              <Typography.Title level={5} className='mb-5'>
                {internalAnnouncementsMessages.files}
              </Typography.Title>
              <FormItem<InternalAnnouncementFormType>
                valuePropName='fileList'
                name='files'
                getValueFromEvent={normFile}
                rules={internalAnnouncementsValidationRules.files}
              >
                <Upload.Dragger multiple listType='picture-card' maxCount={5}></Upload.Dragger>
              </FormItem>
            </div>
          </div>
        </Spin>
      </Form>
    );
  }
);
export default InternalAnnouncementForm;
