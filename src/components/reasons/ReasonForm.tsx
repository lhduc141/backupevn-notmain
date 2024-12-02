import { Form, FormInstance, Input, Spin } from 'antd';
import { FormItem, message } from 'components/common';
import { reasonsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateReasonMutation, useGetReasonDetailQuery, useUpdateReasonMutation } from 'services';
import { CreateReasonDto } from 'types';
import { createReasonInitialValues, reasonsValidationRules, updateReasonInitialValues } from 'utils';

export type ReasonFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  reasonId?: number;
};

export type ReasonFormRefProps = {
  form: FormInstance<ReasonFormType>;
  isLoading: boolean;
};

export type ReasonFormType = CreateReasonDto & {};
const ReasonForm = forwardRef<ReasonFormRefProps, ReasonFormProps>(
  ({ onChangeLoading, onCreateSuccess, reasonId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: reason, isLoading: isLoadingDetail } = useGetReasonDetailQuery(reasonId!, {
      skip: !reasonId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (reason && reasonId) {
        form.setFieldsValue({
          code: reason.data.code,
          content: reason.data.content,
          isActive: reason.data.isActive
        });
      }
    }, [reason, reasonId]);

    const [form] = Form.useForm<ReasonFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateReasonMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateReasonMutation();

    const onFinish = ({ ...values }: ReasonFormType) => {
      const data: CreateReasonDto = {
        ...values
      };

      if (!reasonId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          reasonId,
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
        name='reasonForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={reasonId ? updateReasonInitialValues : createReasonInitialValues}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <FormItem.FloatLabel<ReasonFormType>
            name='code'
            rules={reasonsValidationRules.code}
            label={reasonsMessages.code}
          >
            <Input />
          </FormItem.FloatLabel>

          <FormItem.FloatLabel<ReasonFormType>
            name='content'
            rules={reasonsValidationRules.content}
            label={reasonsMessages.content}
          >
            <Input />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default ReasonForm;
