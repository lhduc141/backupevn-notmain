import { Modal, Skeleton, Typography } from 'antd';
import { useInternalAnnouncementsUnreadCount, useSearchParamsForm } from 'hooks';
import { internalAnnouncementsMessages, messages, sidebarMenuMessages } from 'messages';
import { useEffect, useRef, useState } from 'react';
import { useGetInternalAnnouncementDetailActiveQuery } from 'services';
import InternalAnnouncementDetailActive from './InternalAnnouncementActiveDetail';
import InternalAnnouncementsActive from './InternalAnnouncementsActive';
type InternalAnnouncementsModalProps = {
  open: boolean;
  onCancel: () => void;
};
const { confirm } = Modal;

const InternalAnnouncementsModal: React.FC<InternalAnnouncementsModalProps> = ({ open, onCancel }) => {
  const { getSearchParams, setSearchParam } = useSearchParamsForm();
  const { IA } = getSearchParams();

  const [announcementId, setAnnouncementId] = useState<number>();
  const {
    data: internalAnnouncement,
    error,
    isLoading: isLoadingDetail
  } = useGetInternalAnnouncementDetailActiveQuery(announcementId!, {
    skip: !announcementId,
    refetchOnMountOrArgChange: true
  });
  const { refetch: recountUnread } = useInternalAnnouncementsUnreadCount();
  const data = internalAnnouncement?.data;
  const isRequestConfirm = !error && data?.isRequestConfirm && !data.confirmedAt;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (IA) {
      setAnnouncementId(IA);
      setSearchParam('IA', '');
    }
  }, [IA]);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [announcementId]);

  const handleCloseOrChangeAnnouncement = (newAnnouncementId?: number) => {
    confirm({
      title: `${internalAnnouncementsMessages.closeAnnouncement} `,
      content: internalAnnouncementsMessages.confirmCloseAnnouncement,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        if (newAnnouncementId) {
          setAnnouncementId(newAnnouncementId);
        } else {
          onCancel();
        }
      }
    });
  };
  return (
    <Modal
      styles={{
        body: {
          padding: 0,
          borderRadius: 12,
          overflow: 'hidden'
        }
      }}
      footer={null}
      centered
      destroyOnClose
      width={1188}
      open={open}
      onCancel={() => {
        if (isRequestConfirm) {
          handleCloseOrChangeAnnouncement();
        } else {
          onCancel();
        }
        recountUnread();
      }}
      title={null}
    >
      <div className='flex h-[calc(100vh-80px)]'>
        <div className='h-full max-h-[calc(100vh-80px)] w-[420px] overflow-y-auto bg-colorBgContainerSecondary'>
          <Typography.Title className='mb-6 mt-16 px-6 text-2.5xl'>
            {sidebarMenuMessages.internalAnnouncement}
          </Typography.Title>
          <InternalAnnouncementsActive
            internalAnnouncementId={announcementId}
            setAnnouncementId={(id) => {
              if (isRequestConfirm && data.internalAnnouncementId !== id) {
                handleCloseOrChangeAnnouncement(id);
              } else {
                setAnnouncementId(id);
              }
            }}
          />
        </div>
        <div ref={contentRef} className='relative h-full max-h-[calc(100vh-80px)] flex-1 overflow-y-auto bg-white'>
          {isLoadingDetail ? (
            <Skeleton active></Skeleton>
          ) : error ? (
            <div className='flex h-full items-center justify-center'>
              <Typography.Text>{error.message}</Typography.Text>
            </div>
          ) : data ? (
            <InternalAnnouncementDetailActive data={data} loading={isLoadingDetail} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default InternalAnnouncementsModal;
