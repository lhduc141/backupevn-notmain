import * as fabric from 'fabric';
import { colorsBase } from 'themes';
import { FabricAgentMapSeat } from 'types/fabric-agent-map';
import { generateUUID } from 'utils/common';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import { getSeatName } from './getSeatName';
import { getSeatIP } from './getSeatIp';

export const addSeat = (
  canvas: fabric.Canvas,
  seat?: Partial<FabricAgentMapSeat>,
  name?: string
): FabricAgentMapSeat => {
  const generateId = generateUUID();
  const fill = colorsBase.backgroundColor2;

  const rect = new fabric.Rect({
    left: 0,
    top: 0,
    fill: fill,
    width: seat?.width ?? 88,
    height: seat?.height ?? 88,
    stroke: '#000000',
    backgroundColor: '#F7F8F9',
    strokeWidth: 2,
    rx: 12,
    ry: 12
  });

  const seatName = getSeatName(seat?.seatName || name || '');
  const seatIp = getSeatIP(seat?.seatIp || '-');

  const group = new fabric.Group([rect, seatName, seatIp], {
    left: seat?.left ?? 0,
    top: seat?.top ?? 0,
    selectable: true,
    lockRotation: true,
    hasControls: false
  });

  group.set({ id: seat?.id ?? generateId, objectTypeId: AGENT_MAP_OBJECT_TYPE.SEAT });
  canvas.add(group);
  if (!seat?.seatIp) {
    canvas.setActiveObject(group);
  }

  return {
    left: group.left,
    top: group.top,
    width: group.width,
    height: group.height,
    id: seat?.id ?? generateId,
    seatIp: seat?.seatIp ?? '',
    seatName: seat?.seatName || name || '',
    ...(seat || {})
  };
};
