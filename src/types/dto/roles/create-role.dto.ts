export type CreateRoleDto = {
  code: string;
  name: string;
  description?: string;
  permissionIds: number[];
};
