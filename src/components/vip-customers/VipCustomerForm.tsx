import { Form, FormInstance, Input, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColorSelect, FormItem, message } from 'components';
import SelectCustomers from 'components/customers/SelectCustomer';
import { validateMessages, vipCustomersMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateVipCustomerMutation, useGetVipCustomerDetailQuery, useUpdateVipCustomerMutation } from 'services';
import { CreateVipCustomerDto } from 'types';
import { createVipCustomerInitialValues, updateVipCustomerInitialValues, vipCustomersValidationRules } from 'utils';

export type VipCustomerFromProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  vipCustomerId?: number;
};

export type VipCustomerFromRefProps = {
  form: FormInstance<VipCustomerFormType>;
  isLoading: boolean;
};

export type VipCustomerFormType = Omit<CreateVipCustomerDto, 'parentId'> & {};
const VipCustomerForm = forwardRef<VipCustomerFromRefProps, VipCustomerFromProps>(
  ({ onChangeLoading, onCreateSuccess, vipCustomerId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate || isLoadingUpdate
    }));

    const { data: vipCustomer, isLoading: isLoadingDetail } = useGetVipCustomerDetailQuery(vipCustomerId!, {
      skip: !vipCustomerId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (vipCustomer && vipCustomerId) {
        form.setFieldsValue({
          ...vipCustomer.data
        });
      }
    }, [vipCustomer, vipCustomerId]);

    const [form] = Form.useForm<VipCustomerFormType>();

    const [onCreate, { isLoading: isLoadingCreate }] = useCreateVipCustomerMutation();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateVipCustomerMutation();

    const onFinish = ({ ...values }: VipCustomerFormType) => {
      const data: CreateVipCustomerDto = {
        ...values
      };
      if (!vipCustomerId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          vipCustomerId,
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

    const handleSelectCustomer = (value: DefaultOptionType) => {
      form.setFieldsValue({
        name: value.customerName
      });
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
        name='vipCustomerForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={vipCustomerId ? updateVipCustomerInitialValues : createVipCustomerInitialValues}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <FormItem.FloatLabel<VipCustomerFormType>
            name='code'
            label={vipCustomersMessages.code}
            rules={vipCustomersValidationRules.code}
          >
            <SelectCustomers
              onSelect={(_, option) => handleSelectCustomer(option)}
              labelRender={(props) => props.value}
            />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<VipCustomerFormType>
            name='name'
            label={vipCustomersMessages.name}
            rules={vipCustomersValidationRules.name}
          >
            <Input disabled />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<VipCustomerFormType>
            name='phoneNumber'
            label={vipCustomersMessages.phoneNumber}
            rules={vipCustomersValidationRules.phoneNumber}
          >
            <Input />
          </FormItem.FloatLabel>
          <Form.Item<VipCustomerFormType> label={vipCustomersMessages.color} name='color'>
            <ColorSelect />
          </Form.Item>
          <FormItem.FloatLabel<VipCustomerFormType>
            name='note'
            label={vipCustomersMessages.note}
            rules={vipCustomersValidationRules.note}
          >
            <Input />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default VipCustomerForm;
