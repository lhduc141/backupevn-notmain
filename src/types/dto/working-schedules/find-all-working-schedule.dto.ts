import { FindAllDto } from '../common';

export type FindAllWorkingScheduleDto = FindAllDto & {
  workingScheduleTypeId?: number | number[];
};
