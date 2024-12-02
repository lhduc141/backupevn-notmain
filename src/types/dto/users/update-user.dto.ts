import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto> & {
  userId: number;
};
