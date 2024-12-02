import { Rule } from 'antd/es/form';
import { ReasonFormType } from 'components/reasons/ReasonForm';

export const reasonsValidationRules: Record<keyof ReasonFormType, Rule[]> = {
  code: [{ required: true }],
  content: [{ required: true }],
  isActive: []
};
