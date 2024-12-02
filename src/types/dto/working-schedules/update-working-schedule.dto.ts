import { CreateWorkingScheduleDto } from './create-working-schedule.dto';

export type UpdateWorkingScheduleDto = Partial<CreateWorkingScheduleDto> & {
  workingScheduleId: number;
};
