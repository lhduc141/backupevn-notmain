export type CreateWorkingScheduleDto = {
  /** Loại lịch nghỉ lễ làm bù */
  workingScheduleTypeId: number;

  /** Ngày */
  applyDate: Date;

  /** Diễn giải */
  description?: Date;
};
