import { Button, Checkbox, Divider, Form, FormInstance, Input, Spin, Typography } from 'antd';
import { ButtonOptions, FormItem, message, Upload } from 'components';
import { messages, validateMessages } from 'messages';
import { customerSupportInformationMessages } from 'messages/customer-support-information.messages';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
  useCreateCustomerSupportInformationMutation,
  useDeleteFileMutation,
  useGetCustomerSupportInformationDetailQuery,
  useUpdateCustomerSupportInformationMutation
} from 'services';
import { CreateCustomerSupportInformationDto } from 'types';
import {
  CORE_OPTION_TYPES,
  createCustomerSupportInformationInitialValues,
  CUSTOMER_SUPPORT_INFORMATION_FORMAT,
  customerSupportInformationValidationRules,
  MICROSERVICES,
  updateCustomerSupportInformationInitialValues
} from 'utils';
import CustomerSupportInformationContentFormatLink from './CustomerSupportInformationContentFormatLink';
import CustomerSupportInformationContentFormatTable from './CustomerSupportInformationContentFormatTable';
import CustomerSupportInformationContentFormatText from './CustomerSupportInformationContentFormatText';
import { CUSTOMER_SUPPORT_DEFAULT_ICONS } from 'utils/constants/customer-support-information-default-icons.constant';
import { twMerge } from 'tailwind-merge';
import CustomerSupportInformationExcel from './CustomerSupportInformationExcel';
import { CloseIcon, ExcelFileIcon } from 'assets';
import { ServerIconRefProps } from 'components/common/upload/ServerIcon';

export type CustomerSupportInformationFromProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  customerSupportInformationId?: number;
  className?: string;
};
export type CustomerSupportInformationFormType = CreateCustomerSupportInformationDto;

export type CustomerSupportInformationFromRefProps = {
  form: FormInstance<CustomerSupportInformationFormType>;
  isLoading: boolean;
};
const DATA_EXCEL_CHECK = '[]';
const CustomerSupportInformationForm = forwardRef<
  CustomerSupportInformationFromRefProps,
  CustomerSupportInformationFromProps
>(({ onChangeLoading, onCreateSuccess, customerSupportInformationId, className }, ref) => {
  useImperativeHandle(ref, () => ({
    form: form,
    isLoading: isLoadingCreate || isLoadingUpdate
  }));

  const [form] = Form.useForm<CustomerSupportInformationFormType>();
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const uploadIconRef = useRef<ServerIconRefProps>(null);

  const icon = Form.useWatch('icon', form);
  const content = Form.useWatch('content', form);

  const { data: customerSupportInformation, isLoading: isLoadingDetail } = useGetCustomerSupportInformationDetailQuery(
    customerSupportInformationId!,
    {
      skip: !customerSupportInformationId,
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    if (customerSupportInformation && customerSupportInformationId) {
      form.setFieldsValue({
        ...customerSupportInformation.data,
        icon: customerSupportInformation.data.icon,
        content:
          customerSupportInformation.data.format.optionId === CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE
            ? DATA_EXCEL_CHECK
            : customerSupportInformation.data.content
      });
    }
  }, [customerSupportInformation, customerSupportInformationId]);

  const [onCreate, { isLoading: isLoadingCreate }] = useCreateCustomerSupportInformationMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateCustomerSupportInformationMutation();
  const [onDeleteFile] = useDeleteFileMutation();

  const onFinish = async ({ ...values }: CustomerSupportInformationFormType) => {
    const data: CreateCustomerSupportInformationDto = {
      ...values
    };
    if (!customerSupportInformationId) {
      onCreate(data)
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    } else {
      onUpdate({
        customerSupportInformationId,
        ...data,
        content:
          data.formatId === CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE && data.content === DATA_EXCEL_CHECK
            ? undefined
            : data.content
      })
        .unwrap()
        .then((rs) => {
          if (customerSupportInformation?.data.icon && customerSupportInformation?.data.icon !== data.icon) {
            onDeleteFile(customerSupportInformation?.data.icon).unwrap();
          }
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    }
  };

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoadingCreate || isLoadingUpdate);
    }
  }, [onChangeLoading, isLoadingCreate, isLoadingUpdate]);

  return (
    <div ref={contentContainerRef}>
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name=''
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={
          customerSupportInformationId
            ? updateCustomerSupportInformationInitialValues
            : createCustomerSupportInformationInitialValues
        }
        className={twMerge('flex w-full justify-center', className)}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <div className='flex w-full flex-col items-center'>
            <div className='w-[720px]'>
              <div>
                <Typography.Title className='mb-5 text-lg'>{messages.general}</Typography.Title>
                <div className='mb-6 flex gap-4'>
                  <div className='h-14'>
                    <FormItem<CustomerSupportInformationFormType>
                      name='icon'
                      rules={customerSupportInformationValidationRules.icon}
                    >
                      <Upload.ServerIcon
                        ref={uploadIconRef}
                        fileId={icon}
                        iconItems={CUSTOMER_SUPPORT_DEFAULT_ICONS}
                        onChange={(fileId) => {
                          form.setFieldValue('icon', fileId);
                        }}
                        size={56}
                        shape='square'
                      />
                    </FormItem>
                  </div>

                  <FormItem.FloatLabel<CustomerSupportInformationFormType>
                    name='title'
                    label={customerSupportInformationMessages.title}
                    rules={customerSupportInformationValidationRules.title}
                    className='mb-0 w-full'
                  >
                    <Input />
                  </FormItem.FloatLabel>
                </div>
                <Button
                  onClick={() => uploadIconRef.current && uploadIconRef.current.setOpen(true)}
                  type='link'
                  className='font-normal no-underline'
                >
                  {customerSupportInformationMessages.changeIcon}
                </Button>
                <Form.Item<CustomerSupportInformationFormType>
                  rules={customerSupportInformationValidationRules.isNew}
                  name='isNew'
                  valuePropName='checked'
                  className='mb-0 mt-4'
                >
                  <Checkbox>{customerSupportInformationMessages.checkNew}</Checkbox>
                </Form.Item>
              </div>
              <Divider className='mb-8 mt-6' />
              <div>
                <Typography.Title className='mb-5 text-lg'>
                  {customerSupportInformationMessages.content}
                </Typography.Title>

                <FormItem<CustomerSupportInformationFormType>
                  name='formatId'
                  label={customerSupportInformationMessages.format}
                  hiddenLabel
                  rules={customerSupportInformationValidationRules.formatId}
                  className='mb-0 h-fit w-full'
                  initialValue={CUSTOMER_SUPPORT_INFORMATION_FORMAT.TEXT}
                >
                  <ButtonOptions
                    optionTypeId={CORE_OPTION_TYPES.CUSTOMER_SUPPORT_INFORMATION_FORMAT}
                    service={MICROSERVICES.CORE}
                    onChange={() => form.setFieldValue('content', undefined)}
                    disabled={!!customerSupportInformationId}
                  />
                </FormItem>
              </div>
            </div>

            <div className='mt-8 min-w-[720px]'>
              <Form.Item
                shouldUpdate={(prev: CustomerSupportInformationFormType, curr: CustomerSupportInformationFormType) =>
                  prev.formatId !== curr.formatId
                }
                noStyle
              >
                {() => {
                  const formatId: CUSTOMER_SUPPORT_INFORMATION_FORMAT = form.getFieldValue('formatId');
                  switch (formatId) {
                    case CUSTOMER_SUPPORT_INFORMATION_FORMAT.TEXT:
                      return (
                        <div>
                          <CustomerSupportInformationContentFormatText form={form} initialValue={''} />
                        </div>
                      );
                    case CUSTOMER_SUPPORT_INFORMATION_FORMAT.EXCEL_TABLE:
                      if (customerSupportInformationId && content === DATA_EXCEL_CHECK)
                        return (
                          <div>
                            <div
                              className='relative left-1/2 mb-6 flex h-16 -translate-x-1/2 items-center gap-4 rounded-lg bg-colorBgSmallModal pl-4 pr-[52px]'
                              style={{ width: 720 }}
                            >
                              <ExcelFileIcon />
                              <Typography.Text>{customerSupportInformation?.data?.title}</Typography.Text>
                              <Button
                                onClick={() => {
                                  form.setFieldValue('content', undefined);
                                }}
                                className='absolute right-2 h-8 w-8'
                                shape='circle'
                                type='text'
                                icon={<CloseIcon />}
                              />
                            </div>
                            <CustomerSupportInformationExcel
                              customerSupportInformationId={customerSupportInformationId}
                              showSearch={false}
                              minWidth={720}
                              height={window.innerHeight - 160}
                              maxWidth={
                                contentContainerRef.current?.offsetWidth
                                  ? contentContainerRef.current.offsetWidth - 48
                                  : 1060
                              }
                            />
                          </div>
                        );
                      if (content !== DATA_EXCEL_CHECK) {
                        return (
                          <CustomerSupportInformationContentFormatTable
                            form={form}
                            contentContainer={contentContainerRef.current}
                          />
                        );
                      }
                      return <Spin spinning />;
                    default:
                      return (
                        <div>
                          <CustomerSupportInformationContentFormatLink />
                        </div>
                      );
                  }
                }}
              </Form.Item>
              <Form.Item name='content' noStyle />
            </div>
          </div>
        </Spin>
      </Form>
    </div>
  );
});

export default CustomerSupportInformationForm;
