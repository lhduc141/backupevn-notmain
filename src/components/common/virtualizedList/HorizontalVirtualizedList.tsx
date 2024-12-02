import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

type HorizontalVirtualizedListProps = {
  items: Array<string | number>;
  itemWidth: number;
  height: number;
  renderItem?: (idx: number, style: any) => ReactNode;
};
export type HorizontalVirtualizedListRefProps = {
  scrollTo: (left: number) => void;
};

const HorizontalVirtualizedList = forwardRef<HorizontalVirtualizedListRefProps, HorizontalVirtualizedListProps>(
  ({ items, itemWidth, height, renderItem }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }

      const handleResize = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use imperative handle to expose scroll method
    useImperativeHandle(ref, () => ({
      scrollTo: (left: number) => {
        if (containerRef.current) {
          const listElement = containerRef.current.querySelector('.horizontal-virtualized-list') as HTMLElement;
          if (listElement) {
            listElement.scrollTo({ left: left });
          }
        }
      }
    }));

    const Item = ({ index, style }: any) => {
      if (renderItem) return <>{renderItem(index, style)}</>;
      return (
        <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{items[index]}</div>
      );
    };
    return (
      <div ref={containerRef} style={{ width: '100%' }}>
        {containerWidth > 0 && (
          <List
            height={height}
            itemCount={items.length}
            itemSize={itemWidth}
            layout='horizontal'
            width={containerWidth}
            className='no-scrollbar horizontal-virtualized-list'
          >
            {Item}
          </List>
        )}
      </div>
    );
  }
);

export default HorizontalVirtualizedList;
