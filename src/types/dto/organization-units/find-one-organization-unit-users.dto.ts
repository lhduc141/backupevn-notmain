import { FindAllDto } from '../common';

export type FindOneOrganizationUnitUsersDto = FindAllDto & {
  organizationUnitId: number;
};
