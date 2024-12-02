import { Divider, Form, FormInstance, Input, Skeleton, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem, message } from 'components/common';
import { messages, validateMessages } from 'messages';
import { organizationUnitsMessages } from 'messages/organization-units.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useAddOrganizationUnitMutation,
  useGetOrganizationUnitDetailQuery,
  useUpdateOrganizationUnitMutation
} from 'services/organization-units';
import { CreateOrganizationUnitDto } from 'types';
import {
  AUTH_OPTION_TYPES,
  createOrganizationUnitInitialValues,
  MICROSERVICES,
  ORGANIZATION_UNIT_CLASSIFY,
  organizationUnitValidationRules,
  updateOrganizationUnitInitialValues
} from 'utils';
import { RadioOptions, SelectOrganizationUnits, SelectUsers, TreeCheckboxServiceTypes } from 'components';
export type OrganizationUnitFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  organizationUnitId?: number;
};

export type OrganizationUnitFormRefProps = {
  form: FormInstance<OrganizationUnitsFormType>;
  isLoading: boolean;
};

export type OrganizationUnitsFormType = Omit<
  CreateOrganizationUnitDto,
  'parentId'
  //  | 'serviceTypeIds'
> & {
  parentId?: DefaultOptionType;
  // serviceTypeIds: DefaultOptionType[];
  // organizationUnitClassifyId?: DefaultOptionType;
};
const OrganizationUnitForm = forwardRef<OrganizationUnitFormRefProps, OrganizationUnitFormProps>(
  ({ onChangeLoading, onCreateSuccess, organizationUnitId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate || isLoadingUpdate
    }));

    const [form] = Form.useForm<OrganizationUnitsFormType>();
    const classifyId = Form.useWatch('organizationUnitClassifyId', form);
    const serviceTypeIds = Form.useWatch('serviceTypeIds', form) || [];
    const { data: organizationUnit, isLoading: isLoadingDetail } = useGetOrganizationUnitDetailQuery(
      organizationUnitId!,
      {
        skip: !organizationUnitId,
        refetchOnMountOrArgChange: true
      }
    );

    const [onCreate, { isLoading: isLoadingCreate }] = useAddOrganizationUnitMutation();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateOrganizationUnitMutation();

    useEffect(() => {
      if (organizationUnit && organizationUnitId) {
        form.setFieldsValue({
          ...organizationUnit.data,
          parentId: organizationUnit.data?.parent
            ? {
                label: organizationUnit.data?.parent?.name,
                value: organizationUnit.data.parentId
              }
            : undefined,
          serviceTypeIds: organizationUnit.data.serviceTypes
            ? organizationUnit.data.serviceTypes.map((service) => service.serviceTypeId)
            : [],
          deputyUserIds: organizationUnit.data.deputyUsers?.map((user) => user.userId) || []
        });
      }
    }, [organizationUnit, organizationUnitId]);

    const onFinish = (values: OrganizationUnitsFormType) => {
      const data: CreateOrganizationUnitDto = {
        ...values,
        // serviceTypeIds: values?.serviceTypeIds?.map((o) => o.value as number),
        parentId: values.parentId?.value as number
      };
      if (!organizationUnitId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          organizationUnitId,
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

    const validationRules: Partial<Record<keyof OrganizationUnitsFormType, Rule[]>> = {
      ...organizationUnitValidationRules,
      parentId: [{ required: !organizationUnitId }]
    };
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='organizationUnitForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={organizationUnitId ? updateOrganizationUnitInitialValues : createOrganizationUnitInitialValues}
      >
        <Skeleton loading={isLoadingDetail}>
          <Typography.Title level={5} className='mb-5 text-lg'>
            {messages.general}
          </Typography.Title>
          <FormItem.FloatLabel<OrganizationUnitsFormType>
            rules={validationRules.name}
            label={organizationUnitsMessages.organizationUnitName}
            name='name'
          >
            <Input />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<OrganizationUnitsFormType>
            rules={validationRules.code}
            label={organizationUnitsMessages.code}
            name='code'
          >
            <Input />
          </FormItem.FloatLabel>

          <Divider className='mt-4' />

          <FormItem.FloatLabel<OrganizationUnitsFormType>
            label={organizationUnitsMessages.upperOrganizationUnit}
            rules={validationRules.parentId}
            name='parentId'
          >
            <SelectOrganizationUnits labelInValue />
          </FormItem.FloatLabel>

          <Divider className='mt-4' />

          <Typography.Title level={5} className='mb-5 text-lg'>
            {organizationUnitsMessages.organizationUnitType}
          </Typography.Title>
          <Form.Item<OrganizationUnitsFormType>
            label={organizationUnitsMessages.organizationUnitType}
            rules={validationRules.organizationUnitClassifyId}
            name='organizationUnitClassifyId'
            noStyle
          >
            <RadioOptions service={MICROSERVICES.AUTH} optionTypeId={AUTH_OPTION_TYPES.ORGANIZATION_UNIT_CLASSIFY} />
          </Form.Item>
          <FormItem.ErrorText<OrganizationUnitsFormType> fieldsName={['organizationUnitClassifyId']} form={form} />

          {classifyId === ORGANIZATION_UNIT_CLASSIFY.PHONGDOI && (
            <>
              <Typography.Paragraph className='my-5'>
                {organizationUnitsMessages.headAndDeputyNote}
              </Typography.Paragraph>
              <FormItem.FloatLabel<OrganizationUnitsFormType>
                label={organizationUnitsMessages.headUser}
                rules={validationRules.headUserId}
                name='headUserId'
              >
                <SelectUsers organizationUnitId={organizationUnitId ? [organizationUnitId] : []} />
              </FormItem.FloatLabel>

              <FormItem.FloatLabel<OrganizationUnitsFormType>
                label={organizationUnitsMessages.deputyUser}
                rules={validationRules.deputyUserIds}
                name='deputyUserIds'
              >
                <SelectUsers mode='multiple' organizationUnitId={organizationUnitId ? [organizationUnitId] : []} />
              </FormItem.FloatLabel>
            </>
          )}
          <Divider className='mt-4' />

          <Typography.Title level={5} className='mb-5 text-lg'>
            {organizationUnitsMessages.inchargeService}
          </Typography.Title>
          <Form.Item<OrganizationUnitsFormType>
            rules={validationRules.serviceTypeIds}
            label={organizationUnitsMessages.service}
            name='serviceTypeIds'
            noStyle
          >
            <TreeCheckboxServiceTypes
              value={serviceTypeIds}
              onChange={(value) => form.setFieldValue('serviceTypeIds', value)}
              minLevel={2}
              isActive
            />
          </Form.Item>
          <FormItem.ErrorText<OrganizationUnitsFormType> fieldsName={['serviceTypeIds']} form={form} />
        </Skeleton>
      </Form>
    );
  }
);
export default OrganizationUnitForm;
