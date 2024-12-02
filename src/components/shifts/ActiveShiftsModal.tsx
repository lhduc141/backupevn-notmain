import { Button, List, notification, Skeleton, Spin, Typography } from 'antd';
import { Avatar, Empty, Modal, message } from 'components/common';
import dayjs from 'dayjs';
import { useAllShiftsOptions, useGetShiftMeActive } from 'hooks';
import { messages, shiftsMessages } from 'messages';
import { useEffect, useState } from 'react';
import { useActiveShiftMutation, useInactiveShiftMutation, useUpdateActiveShiftMutation } from 'services';
import { twMerge } from 'tailwind-merge';
import { ResponseShiftOptionDto } from 'types';
import { LOCAL_STORAGE_KEY, WEEKDAY_FORMAT } from 'utils';
import { getShiftDate } from 'utils/helpers';

type SelectedShift = {
  shiftId: number;
  selectedDate: Date;
};

const ActiveShiftsModal = () => {
  const {
    isOpen,
    shiftMeActive,
    isLoading: loadingShiftMeActive,
    handleClose,
    isRequiredShift,
    hasSelectShiftPermission,
    handleRequiredShift
  } = useGetShiftMeActive();

  const { shiftsOptions, isLoading, refetch } = useAllShiftsOptions();
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  const [inactiveShift, { isLoading: isLoadingInactive }] = useInactiveShiftMutation();
  const [activeShift, { isLoading: isLoadingActive }] = useActiveShiftMutation();
  const [updateActiveShift, { isLoading: isUpdateLoadingActive }] = useUpdateActiveShiftMutation();

  const [selectedShift, setSelectedShift] = useState<SelectedShift | undefined>();

  const handleActiveShift = async () => {
    if (
      !shiftsOptions ||
      Object.values(shiftsOptions)
        .flat()
        .filter((o) => o.isValid).length === 0
    ) {
      if (shiftMeActive) {
        await inactiveShift();
      }
      localStorage.setItem(LOCAL_STORAGE_KEY.SHIFT_ACTIVE, 'active');
      message.systemSuccess(shiftsMessages.startWithoutShift);
      handleClose();
      handleRequiredShift(false);
      return;
    }
    if (selectedShift) {
      const data = {
        shiftId: selectedShift.shiftId,
        selectedDate: selectedShift.selectedDate
      };
      if (shiftMeActive) {
        updateActiveShift(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            handleClose();
          });
      } else {
        activeShift(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            handleClose();
          });
      }
    } else {
      notification.error({ message: shiftsMessages.pleaseSelectShift });
    }
  };

  return (
    <Modal.Headless
      title={shiftsMessages.activeShift}
      maskClosable={false}
      centered
      width={688}
      open={(isOpen || (isRequiredShift && !shiftMeActive)) && !loadingShiftMeActive && hasSelectShiftPermission}
      zIndex={2000}
      onCancel={handleClose}
      destroyOnClose
      footer={[
        <Button
          loading={isLoadingActive || loadingShiftMeActive || isUpdateLoadingActive || isLoadingInactive}
          type='primary'
          onClick={handleActiveShift}
          key='btn-submit-shift'
        >
          {messages.confirmButtonText}
        </Button>
      ]}
      closable={!isRequiredShift || !!shiftMeActive}
      styles={{
        content: {
          backgroundColor: '#FFFFFF'
        }
      }}
    >
      {isLoading && !shiftsOptions ? (
        <Skeleton
          className='w-full'
          title={false}
          paragraph={{
            rows: 5,
            width: '100%'
          }}
        />
      ) : (
        <Spin
          spinning={isLoading || isLoadingActive || loadingShiftMeActive || isUpdateLoadingActive || isLoadingInactive}
        >
          <div className='flex flex-col gap-6'>
            {shiftsOptions ? (
              Object.keys(shiftsOptions).map((dateKey) => {
                const date = dateKey as keyof ResponseShiftOptionDto;
                const listOptions = shiftsOptions[date];
                if (listOptions.length === 0) return undefined;
                return (
                  <div key={date}>
                    <Typography.Title level={4}>{getShiftDate(date).format(WEEKDAY_FORMAT)}</Typography.Title>
                    <List
                      dataSource={listOptions}
                      locale={{
                        emptyText: <Empty />
                      }}
                      renderItem={(shift) => (
                        <List.Item
                          onClick={() =>
                            shift.isValid &&
                            setSelectedShift({ shiftId: shift.shiftId, selectedDate: getShiftDate(date).toDate() })
                          }
                          key={shift.shiftId}
                          className={twMerge(
                            'mt-4 cursor-pointer rounded-base px-4 transition-all',
                            shift.shiftId === selectedShift?.shiftId &&
                              getShiftDate(date).isSame(dayjs(selectedShift?.selectedDate), 'day')
                              ? 'border border-colorPrimaryActive bg-colorPrimaryBg'
                              : 'border border-transparent',
                            !shift.isValid ? 'cursor-not-allowed opacity-70' : 'hover:bg-colorBgIconHover'
                          )}
                          style={{
                            borderBlockEnd:
                              shift.shiftId === selectedShift?.shiftId &&
                              getShiftDate(date).isSame(dayjs(selectedShift?.selectedDate), 'day')
                                ? 'inherit'
                                : ''
                          }}
                        >
                          <List.Item.Meta
                            className='items-center'
                            avatar={
                              <Avatar shape='square' avatarBackground='transparent' fileId={shift.icon} size={48} />
                            }
                            title={`${shift.code} - ${shift.name}`}
                            description={`${shiftsMessages.time}: ${shift.fromTime} - ${shift.toTime}`}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                );
              })
            ) : (
              <div>
                <Empty description={shiftsMessages.notHasShiftValid} />
              </div>
            )}
          </div>
        </Spin>
      )}
    </Modal.Headless>
  );
};
export default ActiveShiftsModal;
