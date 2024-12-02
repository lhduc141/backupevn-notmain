import * as fabric from 'fabric';
import { FabricAgentMapOtherObject } from 'types/fabric-agent-map';
import { generateUUID } from 'utils/common';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import { addNameObject } from './addNameObject';

export const addDoor = async (
  canvas: fabric.Canvas,
  otherObject: Partial<FabricAgentMapOtherObject>
): Promise<FabricAgentMapOtherObject | undefined> => {
  if (!otherObject.objectTypeId) return;

  const generateId = generateUUID();
  let groups: any[] = [];
  let svgPath = '/svg/agent-map-single-door.svg';
  if (otherObject.objectTypeId === AGENT_MAP_OBJECT_TYPE.DOUBLE_DOOR) {
    svgPath = '/svg/agent-map-double-door.svg';
  }
  if (otherObject.objectTypeId === AGENT_MAP_OBJECT_TYPE.SLIDING_DOOR) {
    svgPath = '/svg/agent-map-sliding-door.svg';
  }

  await fabric.loadSVGFromURL(svgPath, (objects: any, options: any) => {
    if (objects) {
      const path = objects.getAttribute('d');
      if (path) {
        const door = new fabric.Path(objects.getAttribute('d'), options);
        groups = [...groups, door];
      }
    }
  });

  const door = new fabric.Group(groups, {
    left: otherObject.left ?? 0,
    top: otherObject.top ?? 0,
    angle: otherObject.angle ?? 0,
    lockScalingY: true,
    lockScalingX: true
    // cornerSize: 10,
    // cornerStyle: 'circle'
  });

  door.set({
    id: otherObject.id ?? generateId,
    objectTypeId: AGENT_MAP_OBJECT_TYPE.SINGLE_DOOR
  });

  canvas.add(door);
  if (!otherObject.id) {
    canvas.setActiveObject(door);
  }

  canvas.renderAll();
  if (otherObject.name) {
    addNameObject(door, canvas, otherObject.name);
  }

  return {
    left: door.left,
    top: door.top,
    width: door.width,
    height: door.height,
    angle: door.angle,
    id: otherObject.id ?? generateId,
    objectTypeId: AGENT_MAP_OBJECT_TYPE.SINGLE_DOOR,
    ...otherObject
  };
};
