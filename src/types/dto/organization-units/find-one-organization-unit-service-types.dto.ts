import { FindAllDto } from '../common';

export type FindOneOrganizationUnitServiceTypeDto = FindAllDto & {
  organizationUnitId: number;
};
