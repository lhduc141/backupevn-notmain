import { Skeleton, Space, Spin, Timeline, Typography } from 'antd';
import { InfiniteScroll } from 'components/common';
import dayjs from 'dayjs';
import { useShiftsMe } from 'hooks';
import { groupBy } from 'lodash';
import { shiftsMessages } from 'messages';
import { colorsBase } from 'themes';
import { TIME_STAMP_FORMAT, WEEKDAY_FORMAT } from 'utils';

const UserProfileShiftTab = () => {
  const { shiftsMe, isLoading, handleLoadMore, hasMore } = useShiftsMe();
  const groupedShifts = groupBy(shiftsMe, (o) => dayjs(o.createdAt).format(WEEKDAY_FORMAT));

  if (isLoading)
    return (
      <Skeleton
        paragraph={{
          rows: 10
        }}
      />
    );
  return (
    <InfiniteScroll
      isLoading={isLoading}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<Spin spinning={isLoading}></Spin>}
      endMessage={<p></p>}
    >
      {Object.keys(groupedShifts).map((date) => (
        <div key={date} className='mb-6'>
          <Typography.Paragraph className='mb-4'>{date}</Typography.Paragraph>
          <Timeline
            items={groupedShifts[date].map((shift) => ({
              color: colorsBase.colorTextSecondary,
              dot: <div className='h-2 w-2 rounded-full bg-colorTextSecondary' />,
              children: (
                <div className='flex w-full justify-between'>
                  <Space>
                    <Typography.Text>{shiftsMessages.startShifts} </Typography.Text>
                    <Space split={<Typography.Text className='font-semibold'>-</Typography.Text>}>
                      <Typography.Text className='font-semibold'>{shift.code}</Typography.Text>
                      <Typography.Text className='font-semibold'>{shift.name}</Typography.Text>
                      <Typography.Text className='font-semibold'>{shift.fromTime}</Typography.Text>
                      <Typography.Text className='font-semibold'>{shift.toTime}</Typography.Text>
                    </Space>
                  </Space>
                  <Typography.Text type='secondary'>{dayjs(shift.createdAt).format(TIME_STAMP_FORMAT)}</Typography.Text>
                </div>
              )
            }))}
          />
        </div>
      ))}
    </InfiniteScroll>
  );
};
export default UserProfileShiftTab;
