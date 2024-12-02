import { Form, FormInstance, Input, Spin } from 'antd';
import { FormItem, message } from 'components/common';
import { systemConfigsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetSystemConfigsQuery, useUpdateSystemConfigMutation } from 'services/system-configs';
import { UpdateSystemConfigDto } from 'types/dto/system-configs';
import { updateSystemConfigInitialValues } from 'utils/initial-values/system-configs';

export type SystemConfigFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onSubmitSuccess?: () => void;
};

export type SystemConfigFormRefProps = {
  form: FormInstance<UpdateSystemConfigDto>;
  isLoading: boolean;
};

export type SystemConfigFormType = UpdateSystemConfigDto;

const SystemConfigForm = forwardRef<SystemConfigFormRefProps, SystemConfigFormProps>(
  ({ onChangeLoading, onSubmitSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: systemConfigRes, isLoading: isLoadingDetail } = useGetSystemConfigsQuery();
    const systemConfig = systemConfigRes?.data;
    useEffect(() => {
      if (systemConfig) {
        form.setFieldsValue({
          ratingSystemApiUrl: systemConfig.ratingSystemApiUrl,
          ratingSystemApiKey: systemConfig.ratingSystemApiKey
        });
      }
    }, [systemConfig]);

    const [form] = Form.useForm<SystemConfigFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateSystemConfigMutation();

    const onFinish = (values: SystemConfigFormType) => {
      onUpdate(values)
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onSubmitSuccess?.();
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
        name='systemConfigForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={updateSystemConfigInitialValues}
      >
        <Spin spinning={isLoadingDetail || isLoadingUpdate}>
          <FormItem.FloatLabel<SystemConfigFormType>
            name='ratingSystemApiUrl'
            label={systemConfigsMessages.ratingSystemApiUrl}
          >
            <Input />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<SystemConfigFormType>
            name='ratingSystemApiKey'
            label={systemConfigsMessages.ratingSystemApiKey}
          >
            <Input />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default SystemConfigForm;
