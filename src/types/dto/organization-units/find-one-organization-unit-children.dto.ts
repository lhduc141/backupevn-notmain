import { FindAllDto } from '../common';

export type FindOneOrganizationUnitChildrenDto = FindAllDto & {
  organizationUnitId: number;
};
