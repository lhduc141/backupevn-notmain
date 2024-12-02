import { Rule } from 'antd/es/form';
import { CustomerSupportInformationFormType } from 'components/customer-support-information/CustomerSupportInformationForm';

export const customerSupportInformationValidationRules: Record<keyof CustomerSupportInformationFormType, Rule[]> = {
  content: [{ required: true }],
  formatId: [{ required: true }],
  icon: [{ required: true }],
  isActive: [],
  isNew: [],
  priority: [],
  title: [{ required: true }]
};
