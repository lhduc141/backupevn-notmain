import { Card, Divider, List, Skeleton, Spin, Typography } from 'antd';
import { StyledCheckFilledIcon, StyledCloseFilledIcon } from 'assets';
import { Avatar, InfiniteScroll } from 'components/common';
import dayjs from 'dayjs';
import { useInternalAnnouncementsStatisticPaging } from 'hooks';
import { internalAnnouncementsMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { InternalAnnouncementDto } from 'types';
import { DATE_TIME_FORMAT } from 'utils';

export type InternalAnnouncementStatisticProps = {
  isLoading?: boolean;
  data?: InternalAnnouncementDto;
};

export type InternalAnnouncementStatisticRefProps = {};

const InternalAnnouncementStatistic = forwardRef<
  InternalAnnouncementStatisticRefProps,
  InternalAnnouncementStatisticProps
>(({ data, isLoading }, ref) => {
  useImperativeHandle(ref, () => ({}));

  const {
    data: statisticData,
    count,
    pageIndex,
    handleChangePage,
    isLoading: statisticLoading,
    resetPage
  } = useInternalAnnouncementsStatisticPaging({
    internalAnnouncementId: data?.internalAnnouncementId!
  });

  useEffect(() => {
    resetPage();
  }, [data?.internalAnnouncementId]);

  return (
    <div>
      <Spin spinning={isLoading}>
        <Typography.Title className='mb-5 text-lg'>{internalAnnouncementsMessages.summary}</Typography.Title>
        <div className='flex gap-x-4'>
          <Card className='flex-1'>
            <Typography.Paragraph className='m-0 text-3.5xl font-bold'>{data?.viewedCount}</Typography.Paragraph>
            <Typography.Paragraph type='secondary' className='mb-0 mt-2'>
              {internalAnnouncementsMessages.viewedCount}
            </Typography.Paragraph>
          </Card>
          <Card
            className='flex-1'
            classNames={{
              body: 'p-4'
            }}
          >
            <div className='flex items-center gap-x-1'>
              <Typography.Paragraph className='m-0 text-3.5xl font-bold text-secondaryColor1'>
                {data?.confirmedCount}
              </Typography.Paragraph>
              <Typography.Paragraph type='secondary' className='m-0 font-semibold'>{`/ ${count}`}</Typography.Paragraph>
            </div>
            <Typography.Paragraph type='secondary' className='mb-0 mt-2'>
              {internalAnnouncementsMessages.confirmedCount}
            </Typography.Paragraph>
          </Card>
        </div>
        <Divider className='mb-8 mt-6' />
        <Typography.Title className='mb-5 mt-0 text-lg'>
          {internalAnnouncementsMessages.numberOfUserViewed(count)}
        </Typography.Title>
        <InfiniteScroll
          isLoading={statisticLoading}
          loader={<Skeleton title={false} paragraph={{ rows: 2 }} active />}
          hasMore={!!statisticData && statisticData.length < count}
          next={() => handleChangePage(pageIndex + 1)}
        >
          <List
            dataSource={statisticData}
            rowKey={(item) => item.internalAnnouncementStatisticId}
            renderItem={(item) => (
              <List.Item
                className='items-start'
                extra={
                  item.confirmedAt ? (
                    <Typography.Text className='flex items-center gap-x-2 italic text-secondaryColor1'>
                      <StyledCheckFilledIcon />
                      {internalAnnouncementsMessages.confirmStatusEnum.confirmed}
                    </Typography.Text>
                  ) : (
                    <Typography.Text className='flex items-center gap-x-2 italic text-colorError'>
                      <StyledCloseFilledIcon />
                      {internalAnnouncementsMessages.confirmStatusEnum.notConfirmed}
                    </Typography.Text>
                  )
                }
              >
                <List.Item.Meta
                  avatar={<Avatar fileId={item.user.avatar} name={item.user.fullName} size={44} />}
                  title={item.user.fullName}
                  description={
                    <Typography.Text type='secondary' className='text-sm italic'>
                      {internalAnnouncementsMessages.viewedAtTime(dayjs(item.viewedAt).format(DATE_TIME_FORMAT))}
                    </Typography.Text>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Spin>
    </div>
  );
});
export default InternalAnnouncementStatistic;
