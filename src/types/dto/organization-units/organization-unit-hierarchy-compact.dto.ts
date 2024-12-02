import { OrganizationUnitCompactDto } from './organization-unit-compact.dto';

export type OrganizationUnitHierarchyCompactDto = OrganizationUnitCompactDto & {
  parentId?: number;
  children?: OrganizationUnitHierarchyCompactDto[];
};
