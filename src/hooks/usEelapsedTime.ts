import { useEffect, useState } from 'react';
import { convertTimeAgo } from 'utils';

const useTimeAgo = (time?: string | Date) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | string | number | undefined;
    if (time) {
      const formatTime = () => {
        setElapsedTime(convertTimeAgo(time));
      };

      formatTime();
      interval = setInterval(formatTime, 60000);
    }
    return () => clearInterval(interval);
  }, [time]);

  return elapsedTime;
};

export { useTimeAgo };
