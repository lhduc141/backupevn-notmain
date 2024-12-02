import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { agentMapDoorTypes } from 'utils/constants';

export const onCanvasObjectAdded = (canvas: fabric.Canvas) => {
  canvas.getObjects().map((o) => {
    const object = o as FabricCanvasAgentObject;
    if (object.objectTypeId && agentMapDoorTypes.includes(object?.objectTypeId)) {
      canvas.bringObjectToFront(object);
    }
  });
};
