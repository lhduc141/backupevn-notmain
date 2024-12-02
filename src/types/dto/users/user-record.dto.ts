import { UserDto } from './user.dto';

export type UserRecordDto = Pick<UserDto, 'userId' | 'fullName' | 'shortName' | 'avatar' | 'employeeId' | 'username'>;
