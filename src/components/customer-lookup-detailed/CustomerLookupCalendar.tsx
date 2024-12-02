import { Card } from 'antd'
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { CalendarCustom } from 'components/common/calendar';


dayjs.locale('vi');

const CustomerLookupCalendar = () => {
    return (
        <Card className='w-[320px] h-[254px] mt-3'>
            <CalendarCustom></CalendarCustom>
        </Card>
    )
}

export default CustomerLookupCalendar