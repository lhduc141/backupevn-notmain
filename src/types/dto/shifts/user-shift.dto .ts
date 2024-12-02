import { ShiftDto } from './shift.dto';

export type UserShiftDto = ShiftDto & {
  userShiftId: number;
  userId: number;
  selectedDate: Date;
};
