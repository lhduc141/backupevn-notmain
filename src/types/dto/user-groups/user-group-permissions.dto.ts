import { RoleCompactDto, PermissionCompactDto } from 'types';

export type UserGroupPermissionsDto = {
  userGroupId: number;
  code: string;
  name: string;
  permissions: PermissionCompactDto[];
  roles: RoleCompactDto[];
};
