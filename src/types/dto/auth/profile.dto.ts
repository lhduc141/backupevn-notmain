import { OptionCompactDto } from '../options';

export type ProfileDto = {
  profileId: number;
  userId: number;
  fullName: string;
  shortName: string;
  phoneNumber: string;
  avatar: number;
  genderId: number;
  gender: OptionCompactDto;
  birthday: Date;
  employeeId: string;
  extensionId: string;
  createdAt: Date;
  updatedAt: Date;
};
