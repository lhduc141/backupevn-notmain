import { OrganizationUnitCompactDto, UserCompactDto } from 'types';
import { OrganizationUnitDto } from './organization-unit.dto';

export type OrganizationUnitDetailDto = OrganizationUnitDto & {
  users: UserCompactDto[];
  countChildren?: number;
  children?: OrganizationUnitCompactDto[];
};
