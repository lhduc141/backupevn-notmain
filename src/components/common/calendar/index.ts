import OriginCalendar from './Calendar';
import CalendarRange from './CalendarRange';
import CalendarCustom from './CalendarCustom';

export type CalendarProps = typeof OriginCalendar & {
  Range: typeof CalendarRange;
};
const Calendar = OriginCalendar as CalendarProps;
Calendar.Range = CalendarRange;
export { Calendar };
export {CalendarCustom};
