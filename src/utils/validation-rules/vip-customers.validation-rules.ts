import { Rule } from 'antd/es/form';
import { VipCustomerFormType } from 'components/vip-customers/VipCustomerForm';
import { PHONE_NUMBER_REG_EXP } from 'utils/constants';

export const vipCustomersValidationRules: Record<keyof VipCustomerFormType, Rule[]> = {
  code: [{ required: true }],
  name: [{ required: true }],
  color: [],
  note: [],
  phoneNumber: [{ pattern: PHONE_NUMBER_REG_EXP }]
};
