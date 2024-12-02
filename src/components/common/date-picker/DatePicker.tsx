import { DatePicker as DatePickerAntd, DatePickerProps as DatePickerAntdProps } from 'antd';
import { messages } from 'messages';
import { DATE_FORMAT } from 'utils';

export type DatePickerProps = DatePickerAntdProps & {};
const DatePicker = ({ ...props }: DatePickerProps) => {
  return <DatePickerAntd format={DATE_FORMAT} placeholder={messages.datePickerPlaceHolder} {...props} />;
};
export default DatePicker;
