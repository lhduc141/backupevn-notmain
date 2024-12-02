import { FindAllDto } from '../common';

export type FindOneUserGroupUsersDto = FindAllDto & {
  userGroupId: number;
};
