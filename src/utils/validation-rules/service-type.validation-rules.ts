import { Rule } from 'antd/es/form';
import { ServiceTypeFormType } from 'components/service-types/ServiceTypeForm';

export const serviceTypeValidationRules: Record<keyof ServiceTypeFormType, Rule[]> = {
  /** Danh sách yêu cầu lập phiếu */
  formKeyArr: [],
  code: [{ required: true }],
  form: [],
  isActive: [],
  parentId: [],
  priority: [],
  name: [{ required: true }],
  processingDeadline: [{ required: true }]
};
