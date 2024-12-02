import { OrganizationUnitCompactDto, UserGroupCompactDto, UserCompactDto } from 'types';

export type PermissionDto = {
  permissionId: number; // Required number
  name: string; // Required string
  code: string;
  description?: string; // Optional string
  createdAt: Date; // Required ISO date string
  updatedAt: Date; // Required ISO date string
  userGroups: UserGroupCompactDto[];
  users: UserCompactDto[];
  organizationUnits: OrganizationUnitCompactDto[];
  isApplyAll?: boolean;
};
