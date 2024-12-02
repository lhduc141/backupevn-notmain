import { Rule } from 'antd/es/form';
import { RoleFormType } from 'components/roles/RoleForm';

export const roleValidationRules: Record<keyof RoleFormType, Rule[]> = {
  code: [],
  description: [],
  name: [{ required: true }],
  permissionIds: [{ required: true }]
};
