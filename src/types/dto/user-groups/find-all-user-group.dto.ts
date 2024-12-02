import { FindAllDto } from '../common';

export type FindAllUserGroupDto = FindAllDto & {
  organizationUnitId?: number[];
  /** ID nhóm người dùng cần tìm */
  userGroupId?: number[];

  userGroupClassifyId?: number[];
};
