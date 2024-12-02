import { Button, Typography } from 'antd';
import { LeftIcon, RightIcon } from 'assets';
import dayjs, { Dayjs } from 'dayjs';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MONTH_FORMAT, WEEKDAYS } from 'utils';
import Calendar, { CalendarHeader, CalendarRef } from './Calendar';

type CalendarRangeProps = {
  dates?: Dayjs[];
  onChange?: (dates: Dayjs[]) => void;
};
export type CalendarRangeRef = {};
const time_delay = 300;
const CalendarRange = forwardRef<CalendarRangeRef, CalendarRangeProps>(({ dates, onChange }, ref) => {
  useImperativeHandle(ref, () => ({}));

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [datesState, setDatesState] = useState<Dayjs[]>([]);

  const selectedDates = dates !== undefined ? dates : datesState;
  const selectDates = onChange !== undefined ? onChange : setDatesState;

  const slideRef = useRef<HTMLDivElement>(null);
  const prevMonthRef = useRef<HTMLDivElement>(null);
  const nextMonthRef = useRef<HTMLDivElement>(null);
  const prevMonthCalendarRef = useRef<CalendarRef>(null);
  const nextMonthCalendarRef = useRef<CalendarRef>(null);

  const startCalendarRef = useRef<CalendarRef>(null);
  const endCalendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    if (startCalendarRef.current && endCalendarRef.current) {
      startCalendarRef.current.changeCurrentDate(currentDate);
      endCalendarRef.current.changeCurrentDate(currentDate.add(1, 'month'));
      nextMonthCalendarRef.current?.changeCurrentDate(currentDate.add(2, 'month'));
      prevMonthCalendarRef.current?.changeCurrentDate(currentDate.add(-1, 'month'));
    }
  }, [currentDate]);

  const onSelectDate = (date: Dayjs) => {
    let newDate = selectedDates || [];
    const [start] = newDate;
    if (!start) {
      /** Nếu chưa có start, gán date vào start*/
      newDate[0] = date;
    } else if (date.isBefore(start)) {
      /** Nếu date nhỏ hơn start, gán start cho end và date cho start */
      newDate[1] = start;
      newDate[0] = date;
    } else {
      /** Nếu date lớn hơn hoặc bằng start, gán date cho end */
      newDate[1] = date;
    }
    selectDates([...newDate]);
  };

  const handleNextMonth = () => {
    setTimeout(() => {
      setCurrentDate(currentDate.add(1, 'month'));
    }, time_delay + 10);
    setTimeout(() => {
      if (slideRef.current && nextMonthRef.current) {
        nextMonthRef.current.style.visibility = 'hidden';
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transitionDelay = '20ms';
        slideRef.current.style.transform = 'translateX(0)';
      }
    }, time_delay + 20);
    if (slideRef.current && nextMonthRef.current) {
      nextMonthRef.current.style.visibility = 'visible';
      slideRef.current.style.transitionDelay = '0ms';
      slideRef.current.style.transition = `transform ${time_delay}ms ease-in-out`;
      slideRef.current.style.transform = 'translateX(-272px)';
    }
  };

  const handlePrevMonth = () => {
    setTimeout(() => {
      setCurrentDate(currentDate.add(-1, 'month'));
    }, time_delay + 10);
    setTimeout(() => {
      if (slideRef.current && prevMonthRef.current) {
        prevMonthRef.current.style.visibility = 'hidden';
        prevMonthRef.current.style.left = '0';
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transitionDelay = '20ms';
        slideRef.current.style.transform = 'translateX(0)';
      }
    }, time_delay + 20);
    if (slideRef.current && prevMonthRef.current) {
      prevMonthRef.current.style.visibility = 'visible';
      prevMonthRef.current.style.left = '-272px';
      slideRef.current.style.transitionDelay = '0ms';
      slideRef.current.style.transition = `transform ${time_delay}ms ease-in-out`;
      slideRef.current.style.transform = 'translateX(272px)';
    }
  };
  const renderHeader = ({ current }: CalendarHeader) => {
    return (
      <div className='flex select-none items-center bg-white pb-[52px] pt-[20px]'>
        <Typography.Text className='absolute left-[50%] -translate-x-1/2 whitespace-nowrap text-sm font-semibold'>
          {current.format(MONTH_FORMAT)}
        </Typography.Text>
      </div>
    );
  };
  return (
    <div className='relative flex w-fit'>
      <Button
        onClick={handlePrevMonth}
        className='absolute left-6 top-1 z-10 h-8 w-8'
        shape='circle'
        type='text'
        icon={<LeftIcon />}
      />
      <Button
        className='absolute right-6 top-1 z-10 h-8 w-8'
        onClick={handleNextMonth}
        shape='circle'
        type='text'
        icon={<RightIcon />}
      />
      <div className='absolute left-6 top-10 z-10 flex h-8 w-[calc(100%-48px)] items-center'>
        <div className='mr-6 flex items-center'>
          {WEEKDAYS.map((day, index) => (
            <Typography.Text
              className={twMerge(
                'w-8 text-xs font-semibold leading-8 text-colorTextLabel',
                index > 4 && 'text-colorTextLabelContrast'
              )}
            >
              {day}
            </Typography.Text>
          ))}
        </div>
        <div className='ml-6 flex items-center'>
          {WEEKDAYS.map((day, index) => (
            <Typography.Text
              className={twMerge(
                'w-8 text-xs font-semibold leading-8 text-colorTextLabel',
                index > 4 && 'text-colorTextLabelContrast'
              )}
            >
              {day}
            </Typography.Text>
          ))}
        </div>
      </div>
      <div className='relative h-[288px] w-[544px] overflow-hidden bg-white transition-all'>
        <div ref={slideRef} className='absolute block w-[840px] text-left'>
          <div
            key='prev-month'
            ref={prevMonthRef}
            style={{
              visibility: 'hidden',
              left: 0
            }}
            className='absolute inline-block px-6 align-top'
          >
            <Calendar
              isBlankDate
              date={null}
              ref={prevMonthCalendarRef}
              rangeDates={selectedDates}
              renderHeader={renderHeader}
            />
          </div>
          <div key='start-month' className='inline-block px-6 align-top'>
            <Calendar
              isBlankDate
              date={null}
              ref={startCalendarRef}
              onChange={onSelectDate}
              rangeDates={selectedDates}
              renderHeader={renderHeader}
            />
          </div>
          <div key='end-month' className='inline-block px-6 align-top'>
            <Calendar
              isBlankDate
              date={null}
              ref={endCalendarRef}
              onChange={onSelectDate}
              rangeDates={selectedDates}
              renderHeader={renderHeader}
            />
          </div>
          <div
            key='next-month'
            ref={nextMonthRef}
            style={{
              visibility: 'hidden'
            }}
            className='inline-block px-6 align-top'
          >
            <Calendar
              isBlankDate
              date={null}
              ref={nextMonthCalendarRef}
              rangeDates={selectedDates}
              renderHeader={renderHeader}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CalendarRange;
