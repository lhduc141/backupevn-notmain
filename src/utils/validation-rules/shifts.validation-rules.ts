import { Rule } from 'antd/es/form';
import { ShiftFormType } from 'components/shifts/ShiftForm';

export const shiftsValidationRules: Record<keyof ShiftFormType, Rule[]> = {
  code: [{ required: true }],
  fromTime: [{ required: true }],
  isActive: [],
  name: [{ required: true }],
  toTime: [{ required: true }],
  icon: [{ required: true }],
  iconName: [{ required: true }]
};
