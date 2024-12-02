import { Button, Space, Spin, Typography } from 'antd';
import { Avatar, message } from 'components/common';
import dayjs from 'dayjs';
import { internalAnnouncementsMessages } from 'messages';
import { useConfirmInternalAnnouncementMutation } from 'services';
import { InternalAnnouncementActiveDto } from 'types';
import { convertTimeAgo, DATE_TIME_FORMAT } from 'utils';
import InternalAnnouncementAttachment from './InternalAnnouncementAttachment';

export type InternalAnnouncementDetailActiveProps = {
  loading: boolean;
  data: InternalAnnouncementActiveDto;
};

const InternalAnnouncementDetailActive = ({ data, loading }: InternalAnnouncementDetailActiveProps) => {
  const isRequestConfirm = data?.isRequestConfirm && !data.confirmedAt;
  const isConfirmed = data?.isRequestConfirm && data.confirmedAt;

  const [confirmAnnouncement, { isLoading: isLoadingConfirm }] = useConfirmInternalAnnouncementMutation();

  const handleConfirm = () => {
    confirmAnnouncement(data.internalAnnouncementId)
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
      });
  };

  return (
    <div className='p-6 pb-0'>
      <Spin spinning={loading}>
        {data && (
          <>
            <Space
              className='mb-6'
              split={<Typography.Text className='font-semibold text-subTextColor'>•</Typography.Text>}
            >
              <Typography.Text type='secondary' className='text-xs'>
                {convertTimeAgo(data.createdAt, false)}
              </Typography.Text>
              <div className='flex items-center gap-x-[6px]'>
                <Avatar size={16} fileId={data.createdBy?.avatar} name={data.createdBy?.fullName} />
                <Typography.Text type='secondary' className='text-xs'>
                  {data.createdBy?.fullName}
                </Typography.Text>
              </div>
            </Space>

            <div>
              <Typography.Title className='m-0 text-2.5xl'>{data.title}</Typography.Title>
            </div>

            {isRequestConfirm ? (
              <div className='mt-4 rounded-md border border-transparent bg-secondaryColor2 px-4 py-[10px]'>
                <Typography.Text className='text-sm text-colorTextContrast'>
                  {internalAnnouncementsMessages.scrollToBottomToConfirmText}
                </Typography.Text>
              </div>
            ) : undefined}

            {isConfirmed ? (
              <div className='mt-4 rounded-md border border-transparent bg-secondaryColor1 px-4 py-[10px]'>
                <Typography.Text className='text-sm text-colorTextContrast'>
                  {internalAnnouncementsMessages.confirmAtText(dayjs(data.confirmedAt).format(DATE_TIME_FORMAT))}
                </Typography.Text>
              </div>
            ) : undefined}
            <div className='-mx-6 mt-6 flex max-h-[calc(100vh-364px)] min-h-[calc(100vh-364px)] flex-col overflow-y-auto overflow-x-hidden px-6'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.content
                }}
                className='mb-2 flex-1'
              />

              {isRequestConfirm ? (
                <div className='bg-colorBgBody px-6 py-10 text-center'>
                  <Typography.Paragraph className='mb-4'>
                    {internalAnnouncementsMessages.confirmWarningText}
                  </Typography.Paragraph>
                  <Button loading={isLoadingConfirm} type='primary' ghost onClick={handleConfirm}>
                    {internalAnnouncementsMessages.confirmReadingText}
                  </Button>
                </div>
              ) : undefined}
            </div>
            <InternalAnnouncementAttachment files={data.files} />
          </>
        )}
      </Spin>
    </div>
  );
};
export default InternalAnnouncementDetailActive;
