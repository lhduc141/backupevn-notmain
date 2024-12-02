import { Loadable } from 'components/common';
import { forwardRef, lazy, useRef } from 'react';
import { AGENT_MAP_GRID_NUM, numberToExcelCol } from 'utils';
import { agentMapsMessages } from 'messages';
import { AgentMapCanvasProps, AgentMapCanvasRefProps } from './AgentMapCanvas';
import { AgentMapColumn, AgentMapRow } from 'assets';

const AgentMapCanvas = lazy(() => import('./AgentMapCanvas'));

type AgentMapProps = AgentMapCanvasProps;
export type AgentMapRefProps = AgentMapCanvasRefProps;

const AgentMap = forwardRef<AgentMapRefProps, AgentMapProps>(
  ({ seats, otherObjects, onSeatChange, onOtherObjectsChange }, ref) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const colRef = useRef<HTMLDivElement>(null);
    const grid = Array.from({ length: AGENT_MAP_GRID_NUM }, (_, i) => numberToExcelCol(i));

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = event.currentTarget.scrollTop;
      const scrollLeft = event.currentTarget.scrollLeft;
      if (rowRef.current) {
        rowRef.current.scrollTo({
          top: scrollTop
        });
      }
      if (colRef.current) {
        colRef.current.scrollTo({
          left: scrollLeft
        });
      }
    };

    return (
      <div className='relative flex h-full w-full border border-colorBorder'>
        {/* <div
          ref={rowRef}
          className='borer-r no-scrollbar mb-[6px] mt-[31.5px] h-full max-h-[calc(100%-38px)] w-8 overflow-y-auto border-orange-500'
        >
          <div>
            <AgentMapColumn />
          </div>
        </div>
        <div ref={colRef} className='no-scrollbar absolute left-[31.5px] h-8 w-[calc(100%-38px)] overflow-x-auto'>
          <AgentMapRow />
        </div> */}
        <Loadable message={agentMapsMessages.drawGrid}>
          <AgentMapCanvas
            ref={ref}
            onScroll={handleScroll}
            onOtherObjectsChange={onOtherObjectsChange}
            onSeatChange={onSeatChange}
            otherObjects={otherObjects}
            seats={seats}
          />
        </Loadable>
      </div>
    );
  }
);

export default AgentMap;
