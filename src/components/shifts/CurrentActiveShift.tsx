import { Typography } from 'antd';
import { AfternoonIcon, NightIcon, SunIcon } from 'assets';
import ServerFile from 'components/common/files/ServerFile';
import { useGetShiftMeActive } from 'hooks';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const CurrentActiveShift = () => {
  const { handleOpen, shiftMeActive, isLoading: loadingShiftMeActive } = useGetShiftMeActive();
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    getTimeOfDay();
    setInterval(() => {
      getTimeOfDay();
    }, 3600 * 3);
  }, []);

  const getTimeOfDay = () => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      setTime('morning');
      return;
    } else if (hours >= 12 && hours < 18) {
      setTime('afternoon');
      return;
    } else {
      setTime('night');
      return;
    }
  };
  return (
    <div
      onClick={handleOpen}
      className={twMerge(
        'flex h-10 cursor-pointer items-center rounded-full border border-defaultBorderColor px-4 hover:bg-textHoverBg',
        loadingShiftMeActive && 'skeleton-active min-h-10 min-w-[200px] rounded-base'
      )}
    >
      {shiftMeActive?.icon ? (
        <ServerFile fileId={shiftMeActive.icon} className='w-6 border-none' />
      ) : (
        <div>
          {time === 'morning' ? (
            <SunIcon className='text-[#1564E8]' width={18} height={18} />
          ) : time === 'afternoon' ? (
            <AfternoonIcon className='text-[#FFA500]' width={18} height={18} />
          ) : (
            <NightIcon className='text-[#27408B]' width={18} height={18} />
          )}
        </div>
      )}
      {!loadingShiftMeActive && shiftMeActive ? (
        <Typography.Text className='ml-3 text-sm'>
          {shiftMeActive?.code} • {`${shiftMeActive?.fromTime} - ${shiftMeActive?.toTime}`}
        </Typography.Text>
      ) : null}
    </div>
  );
};
export default CurrentActiveShift;
