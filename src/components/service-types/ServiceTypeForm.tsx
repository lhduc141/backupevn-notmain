import { Divider, Form, FormInstance, Input, InputNumber, Space, Spin, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem, message } from 'components';
import { validateMessages } from 'messages';
import { serviceTypesMessages } from 'messages/service-types.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateServiceTypeMutation, useGetServiceTypeDetailQuery, useUpdateServiceTypeMutation } from 'services';
import { CreateServiceTypeDto, ServiceTypeFormDto } from 'types';
import {
  createServiceTypeInitialValues,
  SERVICE_TYPES_FORM_OPTIONS,
  serviceTypeValidationRules,
  updateServiceTypeInitialValues
} from 'utils';
import SelectServiceTypes from './SelectServiceTypes';
import { RightSideCheckbox } from 'components/common/checkbox';

export type ServiceTypeFromProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  serviceTypeId?: number;
};

export type ServiceTypeFromRefProps = {
  form: FormInstance<ServiceTypeFormType>;
  isLoading: boolean;
};

export type ServiceTypeFormType = Omit<CreateServiceTypeDto, 'parentId'> & {
  /** Danh sách yêu cầu lập phiếu */
  formKeyArr: string[];
  parentId?: DefaultOptionType;
};
const ServiceTypeForm = forwardRef<ServiceTypeFromRefProps, ServiceTypeFromProps>(
  ({ onChangeLoading, onCreateSuccess, serviceTypeId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate || isLoadingUpdate
    }));

    const { data: serviceType, isLoading: isLoadingDetail } = useGetServiceTypeDetailQuery(serviceTypeId!, {
      skip: !serviceTypeId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (serviceType && serviceTypeId) {
        const formKeyArr = Object.keys(serviceType.data.form).filter(
          (key) => serviceType.data.form[key as keyof ServiceTypeFormDto] === true
        );

        form.setFieldsValue({
          ...serviceType.data,
          parentId: serviceType.data.parent
            ? {
                label: serviceType.data.parent?.name,
                value: serviceType.data.parentId
              }
            : undefined,
          formKeyArr
        });
      }
    }, [serviceType, serviceTypeId]);

    const [form] = Form.useForm<ServiceTypeFormType>();
    const formKeyArr = Form.useWatch('formKeyArr', form);

    const [onCreate, { isLoading: isLoadingCreate }] = useCreateServiceTypeMutation();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateServiceTypeMutation();

    const onFinish = ({ formKeyArr, ...values }: ServiceTypeFormType) => {
      const formKey = formKeyArr.filter((value) => !SERVICE_TYPES_FORM_OPTIONS.map((o) => o.value).includes(value));
      const servicesTypesOrigin = SERVICE_TYPES_FORM_OPTIONS.flatMap((o) => o.options.map((o) => o.value));

      const form = servicesTypesOrigin.reduce((acc: Record<string, boolean>, value: string) => {
        if (formKey.includes(value)) acc[value] = true;
        else acc[value] = false;
        return acc;
      }, {});

      const data: CreateServiceTypeDto = {
        ...values,
        parentId: values.parentId?.value as number,
        form
      };

      if (!serviceTypeId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          serviceTypeId,
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
        onChangeLoading(isLoadingCreate || isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingCreate, isLoadingUpdate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='serviceTypeForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={serviceTypeId ? updateServiceTypeInitialValues : createServiceTypeInitialValues}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <>
            <Typography.Title level={5} className='mb-5 text-lg'>
              {serviceTypesMessages.general}
            </Typography.Title>
            <FormItem.FloatLabel<ServiceTypeFormType>
              name='code'
              label={serviceTypesMessages.code}
              rules={serviceTypeValidationRules.code}
            >
              <Input />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<ServiceTypeFormType>
              name='name'
              label={serviceTypesMessages.name}
              rules={serviceTypeValidationRules.name}
            >
              <Input />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<ServiceTypeFormType>
              name='parentId'
              label={serviceTypesMessages.parent}
              rules={serviceTypeValidationRules.parentId}
            >
              <SelectServiceTypes labelInValue isActive />
            </FormItem.FloatLabel>

            <Space.Compact className='w-full'>
              <FormItem.FloatLabel<ServiceTypeFormType>
                name='priority'
                label={serviceTypesMessages.priority}
                rules={serviceTypeValidationRules.priority}
                className='flex-1'
              >
                <InputNumber min={1} className='w-full' />
              </FormItem.FloatLabel>

              <FormItem.FloatLabel<ServiceTypeFormType>
                name='processingDeadline'
                label={serviceTypesMessages.processingDeadline}
                rules={serviceTypeValidationRules.processingDeadline}
                className='flex-1'
              >
                <InputNumber min={1} className='w-full' />
              </FormItem.FloatLabel>
            </Space.Compact>
          </>
          <Divider className='mb-8 mt-5' />

          <>
            <Typography.Title className='mb-5 text-lg'>{serviceTypesMessages.settingRequestForm}</Typography.Title>
            <Form.Item<ServiceTypeFormType>
              name='formKeyArr'
              valuePropName='checkedKeys'
              rules={serviceTypeValidationRules.formKeyArr}
            >
              <RightSideCheckbox
                options={SERVICE_TYPES_FORM_OPTIONS.map((o) => ({
                  label: o.groupLabel,
                  key: o.value,
                  value: o.value,
                  children: o.options.map((option) => ({
                    label: option.label,
                    key: option.value,
                    value: option.value
                  }))
                }))}
                onChange={(value) => form.setFieldValue('formKeyArr', value)}
                value={formKeyArr}
                selectAll
              />
            </Form.Item>
          </>
        </Spin>
      </Form>
    );
  }
);
export default ServiceTypeForm;
