import React from 'react'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import { ArrowLeftIcon, ArrowRightIcon, CustomerLookupTableArrowRight } from 'assets';
import { Calendar, Typography } from 'antd';
import vi from 'antd/es/date-picker/locale/vi_VN';
import classNames from 'classnames';
dayjs.locale('vi_VN');


const CalendarCustom = () => {

    const [currentDate, setCurrentDate] = useState(dayjs());
    // const [selectDate, setSelectDate] = React.useState<Dayjs>(dayjs());
    // const [panelDateDate, setPanelDate] = React.useState<Dayjs>(dayjs());
    const monthsInVietnamese = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ];
    const daysInVietnamese = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const myLocale = {
        ...vi,
        dayFormat: daysInVietnamese
    };
    const onChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            console.log(date.format('YYYY-MM-DD')); // Xử lý sự kiện chọn ngày
        }
    };

    const nextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const prevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };
    const headerRender = () => {
        const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

        return (
            <div className="flex justify-between text-center mb-[5px] mt-[11px] text-[12px]"> {/* Flexbox for single row */}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={` ${day === 'T7' || day === 'CN' ? 'text-[#D1131D]' : 'text-[#868D97]'}`}
                        style={{ flex: 1 }} // Make each header equally spaced
                    >
                        {day}
                    </div>
                ))}
            </div>
        );
    };
    const cellRender = (date: Dayjs, info: any) => {
        // Assume panelDateDate is coming from the state (e.g., `const [panelDateDate, setPanelDate] = useState(dayjs())`)
        const panelDateDate = dayjs(); // Replace this with your actual panelDateDate state

        const isCurrentMonth = date.isSame(panelDateDate, 'month'); // Check if the date is in the current month
        const isPastDate = date.isBefore(dayjs(), 'date'); // Check if the date is in the past
        //const isWeekend = date.day() === 6 || date.day() === 0; // Check if the date is a weekend
        const isToday = date.isSame(dayjs(), 'date'); // Check if it's today's date
        const lastDayOfMonth = date.endOf('month').date(); // Get the last day of the month
        const isFutureDate = date.isAfter(dayjs(), 'date')
        if (!isCurrentMonth) {
            return null; // Skip rendering for dates not in the current month
        }

        if (info.type === 'date') {
            return React.cloneElement(info.originNode, {
                className: 'grid grid-cols-7 gap-0', // Use a 7-column grid with no gaps
                children: (
                    <div
                        className={classNames('relative z-10 w-10 h-6 flex items-center justify-center', {
                            'border-t border-l': true, // Apply top and left borders to all cells
                            'border-r': (date.date() % 7 === 0) || date.date() === lastDayOfMonth, // Apply right border to last column or last day of the month
                            'border-b': date.date() > 24, // Apply bottom border for the last row
                            'bg-[#1564E8] text-white': isToday, // Blue background and white text for today's date
                        })}
                    >
                        <span
                            className={classNames({
                                'text-[#868D97]': isPastDate, // Grey out past dates
                                'font-bold': isFutureDate, // Bold future dates
                            })}

                        >
                            {date.date()}
                        </span>
                    </div>
                ),
            });
        }
    };



    return (
        <>
            <div className='flex flex-row justify-between'>
                <ArrowLeftIcon onClick={prevMonth}>Trước</ArrowLeftIcon>
                <Typography.Text className='text-center text-[16px]/[20px] tracking-normal text-[#141414] opacity-100 font-semibold'>{`${monthsInVietnamese[currentDate.month()]}, ${currentDate.year()}`}</Typography.Text>
                <CustomerLookupTableArrowRight onClick={nextMonth}>Sau</CustomerLookupTableArrowRight>
            </div>
            <Calendar
                locale={myLocale}
                fullCellRender={cellRender}
                className='custom-calendar-customer-lookup'
                value={currentDate} // Chuyển đổi Day.js thành Date cho Calendar
                onChange={onChange}
                fullscreen={false}
                headerRender={() => headerRender()}
            />
        </>
    )
}

export default CalendarCustom

