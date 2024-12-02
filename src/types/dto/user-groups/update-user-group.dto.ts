import { CreateUserGroupDto } from './create-user-group.dto';

export type UpdateUserGroupDto = Partial<CreateUserGroupDto> & {
  userGroupId: number;
};
