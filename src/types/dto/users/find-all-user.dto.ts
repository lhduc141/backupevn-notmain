import { FindAllDto } from '../common';

export type FindAllUserDto = FindAllDto & {
  statusId?: number[];
  organizationUnitId?: number[];
  userGroupId?: number[];
};
