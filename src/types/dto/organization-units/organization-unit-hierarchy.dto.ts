import { OrganizationUnitDto } from './organization-unit.dto';

export type OrganizationUnitHierarchyDto = OrganizationUnitDto & {
  children?: OrganizationUnitHierarchyDto[];
};
