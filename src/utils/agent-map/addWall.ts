import * as fabric from 'fabric';
import { colorsBase } from 'themes';
import { FabricAgentMapOtherObject } from 'types/fabric-agent-map';
import { generateUUID } from 'utils/common';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import { addNameObject } from './addNameObject';

export const addWall = (
  canvas: fabric.Canvas,
  otherObject: Partial<FabricAgentMapOtherObject>
): FabricAgentMapOtherObject => {
  const generateId = generateUUID();
  const fill = colorsBase.mainTextColor;

  const wall = new fabric.Rect({
    left: otherObject.left ?? 0,
    top: otherObject.top ?? 0,
    fill: fill,
    width: otherObject.width ?? 250,
    height: otherObject.height ?? 14,
    angle: otherObject.angle ?? 0,
    lockScalingY: true
  }) as fabric.Rect & { id: string | number };
  wall.set({
    id: otherObject.id ?? generateId,
    objectTypeId: AGENT_MAP_OBJECT_TYPE.WALL
  });

  canvas.add(wall);
  if (!otherObject.id) {
    canvas.setActiveObject(wall);
  }
  canvas.renderAll();
  if (otherObject.name) {
    addNameObject(wall, canvas, otherObject.name);
  }

  return {
    left: wall.left,
    top: wall.top,
    width: wall.width,
    height: wall.height,
    id: otherObject.id ?? generateId,
    ...otherObject,
    objectTypeId: AGENT_MAP_OBJECT_TYPE.WALL
  };
};
