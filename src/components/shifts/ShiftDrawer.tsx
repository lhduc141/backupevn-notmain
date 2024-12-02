import { Descriptions, Divider, DrawerProps, Typography } from 'antd';
import { Avatar, CommonStatus, Drawer } from 'components/common';
import { shiftsMessages, messages } from 'messages';
import { useEffect } from 'react';
import { useGetShiftDetailQuery } from 'services';
import { twMerge } from 'tailwind-merge';
import ShiftActions from './ShiftActions';
import { ShiftDto } from 'types';

type ShiftDrawerDrawerProps = DrawerProps & {
  shiftId?: number;
  onChangeLoading?: (value: boolean) => void;
  onDelete?: (shift: ShiftDto) => void;
  onUpdateStatus?: (shift: ShiftDto) => void;
  onUpdateInfo?: (shift: ShiftDto) => void;
};

const ShiftDrawer = ({
  shiftId,
  onChangeLoading,
  onDelete,
  onUpdateStatus,
  onUpdateInfo,
  ...props
}: ShiftDrawerDrawerProps) => {
  const {
    data,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail
  } = useGetShiftDetailQuery(shiftId!, {
    skip: !shiftId,
    refetchOnMountOrArgChange: true
  });
  const shift = data?.data;
  const isLoading = isFetchingDetail || isLoadingDetail;

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoading);
    }
  }, [onChangeLoading, isLoading]);

  const descriptionItem = [
    {
      key: 'name',
      label: shiftsMessages.name,
      children: shift?.name
    },
    {
      key: 'code',
      label: shiftsMessages.code,
      children: shift?.code
    },
    {
      key: 'icon',
      label: shiftsMessages.icon,
      children: (
        <div className='flex h-6 w-6 items-center justify-center rounded-base bg-backgroundColor3'>
          <Avatar
            className='rounded-none border-none bg-none object-contain'
            size={16}
            fileId={shift?.icon}
            shape='square'
          />
        </div>
      )
    },
    {
      key: 'status',
      label: messages.status,
      children: shift && <CommonStatus textClassname='text-base' value={shift?.isActive} />
    }
  ];
  const timeItem = [
    {
      key: 'fromTime',
      label: shiftsMessages.fromTime,
      children: shift?.fromTime ? `${shift.fromTime}` : '-'
    },
    {
      key: 'toTime',
      label: shiftsMessages.toTime,
      children: shift?.toTime ? `${shift.toTime}` : '-'
    }
  ];

  return (
    <Drawer
      {...props}
      width={454}
      title={''}
      extra={
        <div>
          {shift && (
            <ShiftActions
              shift={shift}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
              onUpdateInfo={onUpdateInfo}
            />
          )}
        </div>
      }
      loading={isLoading}
    >
      <div className={twMerge('min-h-9 w-full', isLoading && !shift && 'skeleton-active')}>
        <Typography.Title className='text-2.5xl'>{shift?.name}</Typography.Title>
      </div>
      <div className={twMerge('mt-8 min-h-[124px] w-full', isLoading && !shift && 'skeleton-active')}>
        <Typography.Title className='mb-4 text-lg'>{messages.general}</Typography.Title>
        <Descriptions items={descriptionItem} column={1} labelStyle={{ minWidth: 140 }} />
      </div>
      <Divider className='mb-8 mt-2' />
      <div className='pb-5'>
        <Typography.Title className='mb-4 text-lg'>{shiftsMessages.time}</Typography.Title>
        <Descriptions items={timeItem} column={1} labelStyle={{ minWidth: 140 }} />
      </div>
    </Drawer>
  );
};

export default ShiftDrawer;
