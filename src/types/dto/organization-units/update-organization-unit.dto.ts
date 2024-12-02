import { CreateOrganizationUnitDto } from './create-organization-unit.dto';

export type UpdateOrganizationUnitDto = Partial<CreateOrganizationUnitDto> & {
  organizationUnitId: number;
};
