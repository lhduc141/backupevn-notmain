import { OptionCompactDto } from '../options';
import { OrganizationUnitCompactDto } from '../organization-units';
import { UserGroupCompactDto } from '../user-groups';

export type UserDto = {
  userId: number;
  username: string;
  email: string;
  statusId: number;
  status: OptionCompactDto;
  organizationUnitId: number;
  organizationUnit?: OrganizationUnitCompactDto;
  fullName: string;
  shortName: string;
  createdAt: Date;
  updatedAt: Date;

  userGroupId?: number;
  userGroup?: UserGroupCompactDto;
  phoneNumber?: string;
  avatar?: number;
  genderId?: number;
  gender?: OptionCompactDto;
  birthday?: Date;
  employeeId?: string;
  extensionId?: string;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  compactOrganizationUnits?: OrganizationUnitCompactDto[];
};
