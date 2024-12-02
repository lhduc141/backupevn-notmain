import { Rule } from 'antd/es/form';
import { UserGroupFormType } from 'components';

export const userGroupsValidationRules: Record<keyof UserGroupFormType, Rule[]> = {
  code: [],
  description: [],
  name: [{ required: true }],
  organizationUnitId: [{ required: true }],
  permissionIds: [],
  roleIds: [],
  userIds: [],
  userGroupClassifyId: [{ required: true }]
};
