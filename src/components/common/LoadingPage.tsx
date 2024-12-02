import { Typography } from 'antd';
import { logo } from 'assets';
import { useGetProfile } from 'hooks';
import { messages } from 'messages';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingThreeDots from './LoadingThreeDots';
import { LOCAL_STORAGE_KEY } from 'utils';
type PropsType = {
  children?: React.ReactNode;
};
const LoadingPage: React.FC<PropsType> = ({ ...props }) => {
  const { isLoading, isError } = useGetProfile();
  const [fadeOut, setFadeOut] = useState(true);
  const [spin, setSpin] = useState(true);
  const access = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  useEffect(() => {
    if (isLoading) {
      setFadeOut(isLoading);
      setSpin(true);
    }
    if (!isLoading) {
      const timeout = setTimeout(() => setFadeOut(false), 1400);

      const timeoutSpin = setTimeout(() => setSpin(false), 600);
      return () => {
        clearTimeout(timeoutSpin);
        clearTimeout(timeout);
      };
    }
  }, [isLoading]);

  return (
    <div id='content'>
      {access && fadeOut && !isError && (
        <div
          className={twMerge(
            'fixed left-0 top-0 z-[10000] flex h-svh w-svw flex-col items-center justify-center overflow-hidden bg-white delay-700',
            !isLoading ? 'left-3 top-[26px] h-12 w-12 bg-transparent' : ''
          )}
          style={{
            transition:
              'top 0.3s ease-in-out,left 0.3s ease-in-out,width 0.3s ease-in-out,height 0.3s ease-in-out,background 0.125s ease-in-out'
          }}
        >
          <img
            src={logo}
            alt={messages.appName}
            className={twMerge(
              'h-18 w-18 animate-spin transition-all delay-700 duration-300',
              !isLoading ? 'h-12 w-12' : ''
            )}
          />

          {spin && (
            <Typography.Title level={5} className='mt-6'>
              {messages.loadingUser}
              <LoadingThreeDots />
            </Typography.Title>
          )}
        </div>
      )}
      {!isLoading && <>{props.children}</>}
    </div>
  );
};
export default LoadingPage;
