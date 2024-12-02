import { UserDto } from './user.dto';

export type UserCompactDto = Pick<UserDto, 'userId' | 'fullName' | 'shortName' | 'avatar' | 'email'>;
