import { PermissionCompactDto } from '../permissions';

export type RoleDto = {
  roleId: number;
  code: string;
  name: string;
  description?: string;
  isSystem: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt: string;
  updatedAt: string;
  permissions?: PermissionCompactDto[];
};
