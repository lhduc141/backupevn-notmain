export type CreateUserGroupDto = {
  code?: string; // Optional string with max length of 50
  name: string; // Required string with max length of 255
  description?: string; // Optional string with max length of 512
  organizationUnitId: number; // Required number
  permissionIds?: number[];
  roleIds?: number[];
  userIds?: number[];
  userGroupClassifyId: number;
};
