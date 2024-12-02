import dayjs, { Dayjs } from 'dayjs';
import { ResponseShiftOptionDto } from 'types';

export const getShiftDate = (dateKey: keyof ResponseShiftOptionDto): Dayjs => {
  switch (dateKey) {
    case 'prevDayShiftOptions':
      return dayjs().subtract(1, 'day');
    case 'todayShiftOptions':
      return dayjs();
    case 'nextDayShiftOptions':
      return dayjs().add(1, 'day');
    default:
      return dayjs();
  }
};
