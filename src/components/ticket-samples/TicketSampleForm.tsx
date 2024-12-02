import { Divider, Form, FormInstance, Input, Spin, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem, message } from 'components/common';
import { SelectServiceTypes } from 'components/service-types';
import { ticketSamplesMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateTicketSampleMutation, useGetTicketSampleDetailQuery, useUpdateTicketSampleMutation } from 'services';
import { CreateTicketSampleDto } from 'types';
import { createTicketSampleInitialValues, ticketSamplesValidationRules, updateTicketSampleInitialValues } from 'utils';

export type TicketSampleFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  ticketSampleId?: number;
};

export type TicketSampleFormRefProps = {
  form: FormInstance<TicketSampleFormType>;
  isLoading: boolean;
};

export type TicketSampleFormType = Omit<CreateTicketSampleDto, 'serviceTypeId'> & {
  serviceTypeId: DefaultOptionType;
};
const TicketSampleForm = forwardRef<TicketSampleFormRefProps, TicketSampleFormProps>(
  ({ onChangeLoading, onCreateSuccess, ticketSampleId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: ticketSample, isLoading: isLoadingDetail } = useGetTicketSampleDetailQuery(ticketSampleId!, {
      skip: !ticketSampleId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (ticketSample && ticketSampleId) {
        form.setFieldsValue({
          ...ticketSample.data,
          serviceTypeId: ticketSample.data.serviceType
            ? {
                value: ticketSample.data.serviceTypeId,
                label: ticketSample.data.serviceType.name
              }
            : undefined
        });
      }
    }, [ticketSample, ticketSampleId]);

    const [form] = Form.useForm<TicketSampleFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateTicketSampleMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateTicketSampleMutation();

    const onFinish = ({ ...values }: TicketSampleFormType) => {
      const data: CreateTicketSampleDto = {
        ...values,
        serviceTypeId: values.serviceTypeId.value as number
      };

      if (!ticketSampleId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          ticketSampleId,
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
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='ticketSampleForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={ticketSampleId ? updateTicketSampleInitialValues : createTicketSampleInitialValues}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <>
            <Typography.Title level={5} className='mb-5 text-lg'>
              {ticketSamplesMessages.general}
            </Typography.Title>
            <FormItem.FloatLabel<TicketSampleFormType>
              label={ticketSamplesMessages.title}
              name='title'
              rules={ticketSamplesValidationRules.title}
            >
              <Input />
            </FormItem.FloatLabel>
            <FormItem.FloatLabel<TicketSampleFormType>
              label={ticketSamplesMessages.summary}
              name='summary'
              rules={ticketSamplesValidationRules.summary}
            >
              <Input.TextArea />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<TicketSampleFormType>
              label={ticketSamplesMessages.hotkey}
              name='hotkey'
              rules={ticketSamplesValidationRules.hotkey}
              className='has-value'
            >
              <Input prefix='#' />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<TicketSampleFormType>
              label={ticketSamplesMessages.serviceType}
              name='serviceTypeId'
              rules={ticketSamplesValidationRules.serviceTypeId}
            >
              <SelectServiceTypes isActive labelInValue />
            </FormItem.FloatLabel>
          </>

          <Divider className='mb-8 mt-5' />

          <>
            <Typography.Title level={5} className='mb-5 text-lg'>
              {ticketSamplesMessages.content}
            </Typography.Title>
            <FormItem.FloatLabel<TicketSampleFormType>
              label={ticketSamplesMessages.content}
              name='content'
              rules={ticketSamplesValidationRules.content}
            >
              <Input.TextArea />
            </FormItem.FloatLabel>
          </>
        </Spin>
      </Form>
    );
  }
);
export default TicketSampleForm;
