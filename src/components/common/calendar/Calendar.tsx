import { Button, Typography } from 'antd';
import { LeftIcon, RightIcon } from 'assets';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { forwardRef, memo, ReactNode, useImperativeHandle, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MONTH_FORMAT, WEEKDAYS } from 'utils';
import Day from './Day';
dayjs.extend(isBetween);

export type CalendarHeader = {
  current: Dayjs;
  onChange: (date: Dayjs) => void;
  nextMonth: () => void;
  prevMonth: () => void;
};
type CalendarProps = {
  date?: Dayjs | null;
  onChange?: (date: Dayjs) => void;
  disabledDate?: (date: Dayjs) => boolean;
  currentDate?: Dayjs;
  renderHeader?: (header: CalendarHeader) => ReactNode;
  rangeDates?: Dayjs[];
  isBlankDate?: boolean;
  className?: string;
};
export type CalendarRef = {
  changeCurrentDate: (date: Dayjs) => void;
};

const Calendar = forwardRef<CalendarRef, CalendarProps>(
  ({ date, rangeDates, onChange, disabledDate, renderHeader, isBlankDate, className, ...props }, ref) => {
    useImperativeHandle(ref, () => ({
      changeCurrentDate: setCurrentDate
    }));
    const [currentDate, setCurrentDate] = useState(props.currentDate || dayjs());
    const [selectedDateState, selectDateState] = useState<Dayjs | null>(null);

    const selectedDate = date !== undefined ? date : selectedDateState;
    const selectDate = onChange !== undefined ? onChange : selectDateState;

    const handlePrevMonth = () => {
      setCurrentDate(currentDate.subtract(1, 'month'));
    };
    const handleNextMonth = () => {
      setCurrentDate(currentDate.add(1, 'month'));
    };

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDayOfWeek = startOfMonth.day() === 0 ? 7 : startOfMonth.day(); // Nếu là CN thì trả về 7
    const daysInMonth = endOfMonth.date();

    const prevMonth = currentDate.subtract(1, 'month');
    const nextMonth = currentDate.add(1, 'month');
    const daysInPrevMonth = prevMonth.endOf('month').date();

    const isSelectedDate = (date: Dayjs) => {
      if (selectedDate && selectedDate.isSame(date, 'day')) {
        return true;
      }
      return false;
    };
    const onSelectDate = (date: Dayjs) => {
      selectDate(date);
    };

    const isDisabledDate = (date: Dayjs) => {
      if (disabledDate) return disabledDate(date);
      return false;
    };

    const isInRangeDate = (date: dayjs.Dayjs) => {
      if (!rangeDates || rangeDates.length === 0) return {};
      const [start, end] = rangeDates;
      return {
        start: start ? date.isSame(start, 'day') : false,
        between: start && end ? date.isBetween(start, end, null, '[]') : false,
        end: end ? date.isSame(end, 'day') : false
      };
    };

    const generateWeeks = () => {
      const days = [];
      const weeks = [];

      /** Ngày tháng trước */
      for (let i = startDayOfWeek - 1; i > 0; i--) {
        const day = daysInPrevMonth - i + 1;
        const date = prevMonth.date(day);
        const { between, start, end } = isInRangeDate(date);
        if (isBlankDate) days.push(<td className='h-8 w-8' />);
        else
          days.push(
            <Day
              className='other-month first-day-of-month'
              date={date}
              onSelect={onSelectDate}
              disabled={isDisabledDate(date)}
              isSelected={isSelectedDate(date)}
              isInRange={between}
              isStart={start}
              isEnd={end}
            />
          );
      }

      /** Ngày tháng hiện tại */
      for (let day = 1; day <= daysInMonth; day++) {
        const date = currentDate.date(day);
        const { between, start, end } = isInRangeDate(date);
        days.push(
          <Day
            className={twMerge(
              day === 1 && isBlankDate && 'first-day-of-month',
              day === daysInMonth && isBlankDate && 'last-day-of-month'
            )}
            date={date}
            onSelect={onSelectDate}
            disabled={isDisabledDate(date)}
            isSelected={isSelectedDate(date)}
            isInRange={between}
            isStart={start}
            isEnd={end}
          />
        );
      }

      /** Ngày tháng sau */
      const remainingDays = (7 - ((startDayOfWeek - 1 + daysInMonth) % 7)) % 7;
      for (let day = 1; day <= remainingDays; day++) {
        const date = nextMonth.date(day);
        const { between, start, end } = isInRangeDate(date);
        if (isBlankDate) days.push(<td className='h-8 w-8' />);
        else
          days.push(
            <Day
              className={twMerge('other-month', day === remainingDays && 'last-day-of-month')}
              date={date}
              onSelect={onSelectDate}
              disabled={isDisabledDate(date)}
              isSelected={isSelectedDate(date)}
              isInRange={between}
              isStart={start}
              isEnd={end}
            />
          );
      }

      // Chia thành các hàng (mỗi hàng 7 ngày)
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(
          <tr key={`week-${i}`} className='week'>
            {days.slice(i, i + 7)}
          </tr>
        );
      }

      return weeks;
    };

    const header = renderHeader ? (
      renderHeader({
        current: currentDate,
        nextMonth: handleNextMonth,
        prevMonth: handlePrevMonth,
        onChange: setCurrentDate
      })
    ) : (
      <div className='relative flex h-full items-center'>
        <Button
          onClick={() => {
            setCurrentDate(currentDate.add(-1, 'month'));
          }}
          className='absolute left-0 h-8 w-8'
          shape='circle'
          type='text'
          icon={<LeftIcon />}
        />
        <Typography.Text className='absolute left-[50%] -translate-x-1/2 whitespace-nowrap text-sm font-semibold'>
          {currentDate.format(MONTH_FORMAT)}
        </Typography.Text>
        <Button
          onClick={() => {
            setCurrentDate(currentDate.add(1, 'month'));
          }}
          className='absolute right-0 h-8 w-8'
          shape='circle'
          type='text'
          icon={<RightIcon />}
        />
      </div>
    );
    return (
      <div className={twMerge('custom-calendar', className)}>
        <div className='relative h-10'>{header}</div>
        <table className='calendar-body'>
          <thead>
            <tr className=''>
              {WEEKDAYS.map((day, index) => (
                <th key={day} className='day-of-week text-center'>
                  <Typography.Text
                    className={twMerge(
                      'text-xs font-semibold leading-8 text-colorTextLabel',
                      index > 4 && 'text-colorTextLabelContrast'
                    )}
                  >
                    {day}
                  </Typography.Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{generateWeeks()}</tbody>
        </table>
      </div>
    );
  }
);

export default memo(Calendar);
