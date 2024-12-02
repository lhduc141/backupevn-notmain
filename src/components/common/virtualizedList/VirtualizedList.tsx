import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

type VirtualizedListProps = {
  items: Array<string | number>;
  itemHeight: number;
  width: number;
  renderItem?: (idx: number, style: any) => ReactNode;
};
export type VirtualizedListRefProps = {
  scrollTo: (top: number) => void;
};

const VirtualizedList = forwardRef<VirtualizedListRefProps, VirtualizedListProps>(
  ({ items, itemHeight, width, renderItem }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }

      const handleResize = () => {
        if (containerRef.current) {
          setContainerHeight(containerRef.current.offsetHeight);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use imperative handle to expose scroll method
    useImperativeHandle(ref, () => ({
      scrollTo: (top: number) => {
        if (containerRef.current) {
          const listElement = containerRef.current.querySelector('.virtualized-list') as HTMLElement;
          if (listElement) {
            listElement.scrollTo({ top: top });
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
      <div ref={containerRef} style={{ height: '100%', width: width, overflowY: 'auto' }}>
        {containerHeight > 0 && (
          <List
            height={containerHeight}
            itemCount={items.length}
            itemSize={itemHeight}
            layout='vertical'
            width={width}
            className='no-scrollbar virtualized-list'
          >
            {Item}
          </List>
        )}
      </div>
    );
  }
);

export default VirtualizedList;
