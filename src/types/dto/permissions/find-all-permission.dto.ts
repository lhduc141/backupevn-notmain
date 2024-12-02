import { FindAllDto } from '../common';

export type FindAllPermissionDto = FindAllDto & {
  roleIds?: number[];
  isLoadAll?: boolean;
  organizationUnitIds?: number[];
};
