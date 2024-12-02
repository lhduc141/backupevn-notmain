import { Form, FormInstance, Spin, Typography } from 'antd';
import { Editor, FormItem, message } from 'components';
import { serviceInstructionsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetServiceInstructionDetailQuery, useUpdateServiceInstructionMutation } from 'services';
import { UpdateServiceInstructionDto } from 'types';
import {
  createServiceInstructionsInitialValues,
  serviceInstructionsValidationRules,
  updateServiceInstructionInitialValues
} from 'utils';

export type ServiceInstructionsFromProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  serviceTypeId: number;
};

export type ServiceInstructionsFromRefProps = {
  form: FormInstance<ServiceInstructionFormType>;
  isLoading: boolean;
};

export type ServiceInstructionFormType = Omit<UpdateServiceInstructionDto, 'serviceTypeId'> & {};
const ServiceInstructionsForm = forwardRef<ServiceInstructionsFromRefProps, ServiceInstructionsFromProps>(
  ({ onChangeLoading, onCreateSuccess, serviceTypeId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: serviceInstructions, isLoading: isLoadingDetail } = useGetServiceInstructionDetailQuery(
      serviceTypeId!,
      {
        skip: !serviceTypeId,
        refetchOnMountOrArgChange: true
      }
    );

    useEffect(() => {
      if (serviceInstructions && serviceTypeId) {
        form.setFieldsValue({
          detail: serviceInstructions.data.detail,
          general: serviceInstructions.data.general,
          profile: serviceInstructions.data.profile
        });
      }
    }, [serviceInstructions, serviceTypeId]);

    const [form] = Form.useForm<ServiceInstructionFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateServiceInstructionMutation();

    const onFinish = ({ ...values }: ServiceInstructionFormType) => {
      const data: UpdateServiceInstructionDto = {
        ...values,
        serviceTypeId
      };

      onUpdate({
        ...data
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
        name='serviceInstructionForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={serviceTypeId ? updateServiceInstructionInitialValues : createServiceInstructionsInitialValues}
      >
        <Spin spinning={isLoadingDetail || isLoadingUpdate}>
          <>
            <Typography.Title level={5}>{serviceInstructionsMessages.general}</Typography.Title>
            <Editor
              onEditorChange={(a) => {
                form.setFieldValue('general', a);
              }}
              initialValue={serviceInstructions?.data.general}
            />
            <FormItem<ServiceInstructionFormType>
              name='general'
              label={serviceInstructionsMessages.general}
              rules={serviceInstructionsValidationRules.general}
              className='hide-label'
            ></FormItem>
          </>
          <>
            <Typography.Title level={5}>{serviceInstructionsMessages.detail}</Typography.Title>
            <Editor
              onEditorChange={(a) => {
                form.setFieldValue('detail', a);
              }}
              initialValue={serviceInstructions?.data.detail}
            />
            <FormItem<ServiceInstructionFormType>
              name='detail'
              label={serviceInstructionsMessages.detail}
              rules={serviceInstructionsValidationRules.detail}
              className='hide-label'
            ></FormItem>
          </>
          <>
            <Typography.Title level={5}>{serviceInstructionsMessages.profile}</Typography.Title>

            <Editor
              onEditorChange={(a) => {
                form.setFieldValue('profile', a);
              }}
              initialValue={serviceInstructions?.data.profile}
            />
            <FormItem<ServiceInstructionFormType>
              name='profile'
              label={serviceInstructionsMessages.profile}
              rules={serviceInstructionsValidationRules.profile}
              className='hide-label'
            ></FormItem>
          </>
        </Spin>
      </Form>
    );
  }
);
export default ServiceInstructionsForm;
