import { OrganizationUnitDto } from './organization-unit.dto';

export type OrganizationUnitCompactDto = Pick<
  OrganizationUnitDto,
  'organizationUnitId' | 'code' | 'name' | 'shortName' | 'parent'
>;
