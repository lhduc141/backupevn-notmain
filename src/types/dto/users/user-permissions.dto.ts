import { PermissionCompactDto } from '../permissions';
import { RoleCompactDto } from '../roles';
import { UserGroupPermissionsDto } from '../user-groups';

export type UserPermissionsDto = {
  userId: number;
  permissions: PermissionCompactDto[];
  userGroup?: UserGroupPermissionsDto;
  roles?: RoleCompactDto[];
};
