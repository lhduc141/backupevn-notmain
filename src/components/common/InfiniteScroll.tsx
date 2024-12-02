import React from 'react';
import { InView } from 'react-intersection-observer';

type PropsType = {
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
  maxHeight?: string | number;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  hasMore: boolean;
  isLoading?: boolean;
  next: () => void;
  children: React.ReactNode;
};

function InfiniteScroll({
  className,
  style,
  height,
  maxHeight,
  loader,
  endMessage,
  hasMore,
  isLoading,
  next,
  children
}: PropsType) {
  const loadMore = () => {
    if (hasMore && !isLoading) {
      try {
        next();
      } catch (error) {
        console.error('Error loading next page:', error);
      }
    }
  };

  return (
    <div
      className={className}
      style={{
        height,
        maxHeight,
        overflow: height || maxHeight ? 'auto' : 'hidden',
        ...style
      }}
    >
      {children}
      {isLoading && (hasMore ? loader : endMessage)}
      {hasMore && (
        <InView
          as='div'
          onChange={(inView) => {
            if (inView) {
              loadMore();
            }
          }}
        />
      )}
    </div>
  );
}

export default InfiniteScroll;
