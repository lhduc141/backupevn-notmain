import dayjs from 'dayjs';
import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

type DayProps = {
  date: dayjs.Dayjs;
  onSelect?: (date: dayjs.Dayjs) => void;
  className?: string;
  isSelected?: boolean;
  disabled?: boolean;
  isInRange?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
};

const Day: React.FC<DayProps> = ({ date, onSelect, isSelected, className, isStart, isInRange, isEnd, disabled }) => {
  const isToday = dayjs().isSame(date, 'day');
  const isWeekend = date.day() === 0 || date.day() === 6;
  const day = date?.format('D');

  const isDisabled = disabled;
  return (
    <td>
      <div
        key={`${date?.format('DD-MM-YYYY')}`}
        className={twMerge(
          `day`,
          isWeekend && 'is-weekend',
          isToday && 'is-today',
          isSelected && 'is-selected',
          isDisabled && 'disabled',
          isInRange && 'is-in-range',
          isStart && 'is-start',
          isEnd && 'is-end',
          className
        )}
        onClick={() => !isDisabled && onSelect?.(date)}
      >
        <span>{day}</span>
      </div>
    </td>
  );
};

export default memo(Day);
