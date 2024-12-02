import { Form, FormInstance, Input, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem, message } from 'components/common';
import SelectServiceTypes from 'components/service-types/SelectServiceTypes';
import { ticketCancelReasonsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useCreateTicketCancelReasonMutation,
  useGetTicketCancelReasonDetailQuery,
  useUpdateTicketCancelReasonMutation
} from 'services';
import { CreateTicketCancelReasonDto } from 'types';
import {
  createTicketCancelReasonInitialValues,
  ticketCancelReasonsValidationRules,
  updateTicketCancelReasonInitialValues
} from 'utils';

export type TicketCancelReasonFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  ticketCancelReasonId?: number;
};

export type TicketCancelReasonFormRefProps = {
  form: FormInstance<TicketCancelReasonFormType>;
  isLoading: boolean;
};

export type TicketCancelReasonFormType = Omit<CreateTicketCancelReasonDto, 'serviceTypeIds'> & {
  serviceTypeIds: DefaultOptionType[];
};
const TicketCancelReasonForm = forwardRef<TicketCancelReasonFormRefProps, TicketCancelReasonFormProps>(
  ({ onChangeLoading, onCreateSuccess, ticketCancelReasonId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: ticketCancelReason, isLoading: isLoadingDetail } = useGetTicketCancelReasonDetailQuery(
      ticketCancelReasonId!,
      {
        skip: !ticketCancelReasonId,
        refetchOnMountOrArgChange: true
      }
    );

    useEffect(() => {
      if (ticketCancelReason && ticketCancelReasonId) {
        form.setFieldsValue({
          ...ticketCancelReason.data,
          serviceTypeIds: ticketCancelReason.data.serviceTypes
            ? ticketCancelReason.data.serviceTypes.map((service) => ({
                label: service?.name,
                value: service.serviceTypeId
              }))
            : []
        });
      }
    }, [ticketCancelReason, ticketCancelReasonId]);

    const [form] = Form.useForm<TicketCancelReasonFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateTicketCancelReasonMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateTicketCancelReasonMutation();

    const onFinish = ({ ...values }: TicketCancelReasonFormType) => {
      const data: CreateTicketCancelReasonDto = {
        ...values,
        serviceTypeIds: values?.serviceTypeIds?.map((o) => o.value as number)
      };

      if (!ticketCancelReasonId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          ticketCancelReasonId,
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
        name='ticketCancelReasonForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={
          ticketCancelReasonId ? updateTicketCancelReasonInitialValues : createTicketCancelReasonInitialValues
        }
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <FormItem.FloatLabel<TicketCancelReasonFormType>
            label={ticketCancelReasonsMessages.content}
            name='content'
            rules={ticketCancelReasonsValidationRules.content}
          >
            <Input.TextArea />
          </FormItem.FloatLabel>

          <FormItem.FloatLabel<TicketCancelReasonFormType>
            label={ticketCancelReasonsMessages.serviceTypes}
            name='serviceTypeIds'
            rules={ticketCancelReasonsValidationRules.serviceTypeIds}
          >
            <SelectServiceTypes isActive labelInValue mode='multiple' />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default TicketCancelReasonForm;
