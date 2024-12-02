import * as fabric from 'fabric';
import { findIndex } from 'lodash';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const removeObject = (objectId: string | number, canvas: fabric.Canvas, seats: any[]) => {
  if (canvas) {
    let objects = canvas.getObjects().filter((o) => {
      const item = o as FabricCanvasAgentObject;
      return item.id;
    }) as FabricCanvasAgentObject[];
    let removedItem = findIndex(objects, (o) => o.id === objectId);

    while (removedItem !== -1) {
      canvas.remove(objects[removedItem]);
      objects.splice(removedItem, 1);

      removedItem = findIndex(objects, (o) => o.id === objectId);
    }
  }
  return seats.filter((o) => o.id !== objectId);
};
