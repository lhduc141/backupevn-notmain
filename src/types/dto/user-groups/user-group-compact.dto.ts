import { UserGroupDto } from './user-group.dto';

export type UserGroupCompactDto = Pick<UserGroupDto, 'name' | 'code' | 'userGroupId'>;
