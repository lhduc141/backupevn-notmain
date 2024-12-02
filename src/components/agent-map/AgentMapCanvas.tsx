import * as fabric from 'fabric';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AGENT_MAP_GRID_NUM, AGENT_MAP_GRID_SIZE, AGENT_MAP_OBJECT_TYPE, agentMapOtherObjectsTypes } from 'utils';
import { addSeat, addWall, editInfoSeat, removeObject, removeSeat } from 'utils/agent-map';
import { addDoor } from 'utils/agent-map/addDoor';
import AgentMapContextMenuSeat, { AgentMapContextMenuSeatRef } from './AgentMapContextMenuSeat';
import { FabricCanvasAgentObject, FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';
import AgentMapContextMenuOtherObject, { AgentMapContextMenuOtherObjectRef } from './AgentMapContextMenuOtherObject';
import AgentMapModalInfoSeat, { AgentMapFormInfoSeatType, AgentMapModalInfoSeatRef } from './AgentMaModalInfoSeat';
import { find, findIndex } from 'lodash';
import {
  onCanvasContextMenu,
  onCanvasDbClick,
  onCanvasMouseDown,
  onCanvasObjectAdded,
  onCanvasObjectModified,
  onCanvasWheel,
  onCopyObject,
  onKeydownMoveObject,
  onPasteObject
} from 'utils/agent-map-event';

export type AgentMapCanvasProps = {
  onSeatChange?: (value: FabricAgentMapSeat[]) => void;
  onOtherObjectsChange?: (value: any[]) => void;
  seats?: FabricAgentMapSeat[];
  otherObjects?: FabricAgentMapOtherObject[];
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};
export type AgentMapCanvasRefProps = {
  addSeat: (seat?: Partial<FabricAgentMapSeat>) => void;
  addObject: (objectType: Partial<FabricAgentMapOtherObject>) => void;
  getObjects: () => {
    seats: FabricAgentMapSeat[];
    otherObjects: FabricAgentMapOtherObject[];
  };
  reset: () => void;
};

const AgentMapCanvas = forwardRef<AgentMapCanvasRefProps, AgentMapCanvasProps>(
  ({ seats, otherObjects, onSeatChange, onOtherObjectsChange, onScroll }, ref) => {
    useImperativeHandle(ref, () => ({
      addSeat: handleAddSeat,
      addObject: handleAddObject,
      getObjects: () => {
        return {
          seats: seatsArr.current,
          otherObjects: objectArr.current
        };
      },
      reset: resetAgentMap
    }));

    const parentDiv = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas = useRef<fabric.Canvas | null>(null);

    const contextMenuSeatRef = useRef<AgentMapContextMenuSeatRef>(null);
    const contextMenuObjectRef = useRef<AgentMapContextMenuOtherObjectRef>(null);

    const seatsArr = useRef<FabricAgentMapSeat[]>([]);
    const objectArr = useRef<FabricAgentMapOtherObject[]>([]);
    const activeCanvasObj = useRef<FabricCanvasAgentObject | fabric.Textbox>();

    const [openInfo, setOpenInfo] = useState(false);
    const infoSeatRef = useRef<AgentMapModalInfoSeatRef>(null);

    const [scale, setScale] = useState(1);

    const [clipboard, setClipboard] = useState<FabricCanvasAgentObject | null>(null);

    useEffect(() => {
      if (canvasRef.current) {
        canvas.current = new fabric.Canvas(canvasRef.current);

        canvas.current.on('mouse:dblclick', (e) => {
          if (!canvas.current) return;
          onCanvasDbClick(e, canvas.current, objectArr);
        });

        canvas.current.on('object:moving', (e) => {
          removeNameWhenModified();
        });

        canvas.current.on('object:scaling', (e) => {
          removeNameWhenModified();
        });

        canvas.current.on('object:rotating', (e) => {
          removeNameWhenModified();
        });

        canvas.current.on('object:modified', (e) => {
          if (!canvas.current) return;
          onCanvasObjectModified({
            e,
            canvas: canvas.current,
            objectArr,
            onOtherObjectsChange,
            seatsArr,
            onSeatChange
          });
        });

        canvas.current.on('mouse:down', (e) => {
          if (!canvas.current) return;
          onCanvasMouseDown(e, canvas.current, activeCanvasObj);
        });

        canvas.current.on('contextmenu', (e) => {
          if (parentDiv.current) {
            const data = onCanvasContextMenu(e, parentDiv.current);
            if (!data) return;
            if (data.objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT && contextMenuSeatRef.current) {
              contextMenuSeatRef.current.open(
                {
                  x: data.x,
                  y: data.y
                },
                data.id
              );
              return;
            }
            if (
              data.objectTypeId &&
              agentMapOtherObjectsTypes.includes(data.objectTypeId) &&
              contextMenuObjectRef.current
            ) {
              contextMenuObjectRef.current.open(
                {
                  x: data.x,
                  y: data.y
                },
                data.id
              );
            }
          }
        });

        canvas.current.on('selection:created', () => {
          const selectedObjects = canvas.current?.getActiveObjects();
          if (selectedObjects?.length && selectedObjects?.length > 1) {
            // Nếu có nhiều hơn một đối tượng được chọn, hủy bỏ hành động nhóm
            canvas.current?.discardActiveObject();
          }
        });

        canvas.current.on('mouse:wheel', (event) => {
          if (!canvas.current) return;
          const scale = onCanvasWheel(event, canvas.current);
          scale && setScale(scale);
        });

        canvas.current.on('object:added', (event) => {
          if (!canvas.current) return;
          onCanvasObjectAdded(canvas.current);
        });
      }

      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleMouseDown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMouseDown);
        canvas.current?.dispose();
      };
    }, []);

    useEffect(() => {
      document.addEventListener('keydown', handleCopyPasteObject);
      return () => {
        document.removeEventListener('keydown', handleCopyPasteObject);
      };
    }, [clipboard]);

    useEffect(() => {
      if (canvas.current) {
        resetAgentMap();
        if (seats && seats.length > 0) {
          seatsArr.current = [];
          seats.forEach((seat) => {
            handleAddSeat(seat);
          });
        }
        if (otherObjects && otherObjects.length > 0) {
          objectArr.current = [];
          otherObjects.forEach((object) => {
            handleAddObject(object);
          });
        }
      }
    }, [seats, otherObjects]);

    const resetAgentMap = () => {
      if (canvas.current) {
        canvas.current.clear();
        objectArr.current = [];
        seatsArr.current = [];
      }
    };

    const handleCopyPasteObject = async (event: KeyboardEvent) => {
      if (!canvas.current) return;
      onCopyObject(event, canvas.current, setClipboard);
      onPasteObject(event, clipboard, setClipboard, handleAddSeat, handleAddObject);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!canvas.current) return;
      onKeydownMoveObject(event, canvas.current);
      onKeyDownDeleteObject(event);
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (!parentDiv.current || !canvas.current) return;
      const rect = parentDiv.current.getBoundingClientRect();

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        canvas.current.discardActiveObject();
      }
    };

    const onKeyDownDeleteObject = (event: KeyboardEvent) => {
      if (!canvas.current) return;
      if (event.key === 'Backspace' || event.key === 'Delete') {
        const activeObject = canvas.current?.getActiveObject() as FabricCanvasAgentObject;
        if (activeObject?.objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT) {
          activeObject.id && handleRemoveSeat(activeObject.id);
          return;
        }
        if (activeObject?.objectTypeId && agentMapOtherObjectsTypes.includes(activeObject?.objectTypeId)) {
          activeObject.id && handleRemoveOtherObject(activeObject.id);
          return;
        }
      }
    };

    const handleAddSeat = (seat?: Partial<FabricAgentMapSeat>) => {
      if (canvas.current) {
        const midPos = getMiddlePosition();
        const seatName = seatsArr.current?.length + 1;
        const seatAdded = addSeat(
          canvas.current,
          {
            left: midPos?.x,
            top: midPos?.y ? midPos.y - 44 : 0,
            ...seat
          },
          seatName.toString()
        );
        seatsArr.current = [...seatsArr.current, seatAdded];
        onSeatChange?.(seatsArr.current);
      }
    };

    const handleRemoveSeat = (seatId: string | number) => {
      if (canvas.current && seatsArr.current) {
        const seats = removeSeat(seatId, canvas.current, seatsArr.current);
        seatsArr.current = [...seats];
        onSeatChange?.(seatsArr.current);
      }
    };

    const handleEditSeat = (seatId: string | number) => {
      if (canvas.current && seatsArr.current) {
        const seat = find(seatsArr.current, { id: seatId });
        if (seat && infoSeatRef.current) {
          infoSeatRef.current.setFieldsValue({
            seatIp: seat.seatIp,
            seatName: seat.seatName,
            id: seatId
          });
          setOpenInfo(true);
        }
      }
    };

    const handleEditInfoSeat = (values: AgentMapFormInfoSeatType) => {
      if (canvas.current && seatsArr.current) {
        const seatIdx = findIndex(seatsArr.current, { id: values.id });
        if (seatIdx !== -1 && infoSeatRef.current) {
          seatsArr.current[seatIdx] = {
            ...seatsArr.current[seatIdx],
            seatIp: values.seatIp
            // seatName: values.seatName
          };
          editInfoSeat(values, canvas.current);
          onSeatChange?.(seatsArr.current);
          setOpenInfo(false);
        }
      }
    };

    const handleAddObject = (otherObject: Partial<FabricAgentMapOtherObject>) => {
      if (!canvas.current || !otherObject.objectTypeId) return;
      if (otherObject.objectTypeId === AGENT_MAP_OBJECT_TYPE.WALL) {
        handleAddWall(otherObject);
      } else {
        handleAddDoor(otherObject);
      }
    };

    const handleAddWall = (otherObject: Partial<FabricAgentMapOtherObject>) => {
      if (!canvas.current) return;
      const midPos = getMiddlePosition();
      const wall = addWall(canvas.current, {
        left: midPos?.x ? midPos.x - 100 : 0,
        top: midPos?.y ? midPos.y - 44 : 0,
        ...otherObject
      });
      objectArr.current = [...objectArr.current, wall];
      onOtherObjectsChange?.(objectArr.current);
    };

    const handleAddDoor = (otherObject: Partial<FabricAgentMapOtherObject>) => {
      if (!canvas.current) return;
      const midPos = getMiddlePosition();
      addDoor(canvas.current, {
        left: midPos?.x ? midPos.x : 0,
        top: midPos?.y ? midPos.y - 44 : 0,
        ...otherObject
      }).then((door) => {
        if (door) {
          objectArr.current = [...objectArr.current, door];
          onOtherObjectsChange?.(objectArr.current);
        }
      });
    };

    const handleRemoveOtherObject = (seatId: string | number) => {
      if (canvas.current && objectArr.current) {
        const seats = removeObject(seatId, canvas.current, objectArr.current);
        objectArr.current = [...seats];
        onOtherObjectsChange?.(objectArr.current);
      }
    };

    const removeNameWhenModified = () => {
      if (activeCanvasObj.current) {
        canvas.current?.remove(activeCanvasObj.current);
        activeCanvasObj.current = undefined;
      }
    };

    const getMiddlePosition = () => {
      if (!parentDiv.current) return;

      const parentRect = parentDiv.current.getBoundingClientRect();

      const parentScrollTop = parentDiv.current.scrollTop;
      const parentScrollLeft = parentDiv.current.scrollLeft;

      const width = AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * scale;

      const middleX = (width - parentRect.width) / 2 + parentScrollLeft;
      const middleY = parentRect.height / 2 + parentScrollTop;

      return { x: middleX, y: middleY };
    };

    return (
      <div
        ref={parentDiv}
        // onScroll={onScroll}
        className='slim-scrollbar-horizontal relative w-full max-w-[calc(100%)] flex-1 overflow-auto bg-white'
      >
        <div
          style={{
            width: AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * scale,
            height: AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * scale,
            transform: `scale(${scale})`
          }}
          className='absolute bg-agent-bg bg-repeat'
        ></div>
        <div
          style={{
            width: AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * scale,
            height: AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * scale
          }}
          className='overflow-hidden'
        >
          <div className='flex h-fit w-fit'>
            <canvas
              ref={canvasRef}
              width={AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * 2}
              height={AGENT_MAP_GRID_NUM * AGENT_MAP_GRID_SIZE * 2}
            />
          </div>

          <AgentMapModalInfoSeat
            ref={infoSeatRef}
            onCancel={() => {
              setOpenInfo(false);
            }}
            open={openInfo}
            existingSeats={seatsArr.current || []}
            handleSubmit={handleEditInfoSeat}
          />
          <AgentMapContextMenuSeat
            ref={contextMenuSeatRef}
            onDeleteSeat={handleRemoveSeat}
            onEditInfoSeat={handleEditSeat}
          />
          <AgentMapContextMenuOtherObject ref={contextMenuObjectRef} onDeleteOtherObject={handleRemoveOtherObject} />
        </div>
      </div>
    );
  }
);

export default AgentMapCanvas;
