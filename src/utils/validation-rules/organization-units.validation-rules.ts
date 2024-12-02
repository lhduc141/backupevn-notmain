import { Rule } from 'antd/es/form';
import { OrganizationUnitsFormType } from 'components';

export const organizationUnitValidationRules: Record<keyof OrganizationUnitsFormType, Rule[]> = {
  code: [{ required: true }],
  description: [],
  name: [
    {
      required: true
    }
  ],
  parentId: [{ required: true }],
  shortName: [],
  serviceTypeIds: [],
  organizationUnitClassifyId: [{ required: true }],
  headUserId: [],
  deputyUserIds: []
};
