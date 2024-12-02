import { CreateShiftDto } from './create-shift.dto';

export type UpdateShiftDto = Partial<CreateShiftDto> & {
  shiftId: number;
};
