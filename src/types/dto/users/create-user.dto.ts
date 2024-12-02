export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
  statusId: number;
  fullName: string;
  organizationUnitId: number;
  userGroupId?: number | null;
  shortName?: string;
  phoneNumber?: string;
  avatar?: number | null;
  genderId?: number;
  birthday?: Date;
  employeeId: string;
  extensionId?: string;
  permissionIds?: number[];
  roleIds?: number[];
};
