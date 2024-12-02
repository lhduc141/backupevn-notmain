import { Rule } from 'antd/es/form';
import { ServiceInstructionFormType } from 'components/service-instructions/ServiceInstructionForm';

export const serviceInstructionsValidationRules: Record<keyof ServiceInstructionFormType, Rule[]> = {
  detail: [],
  general: [],
  profile: []
};
