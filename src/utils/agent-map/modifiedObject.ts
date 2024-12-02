import { findIndex } from 'lodash';
import { FabricAgentMapOtherObject, FabricCanvasAgentObject } from 'types/fabric-agent-map';
import * as fabric from 'fabric';
import { findNameOfObject } from 'utils/agent-map/findNameOfObject';
import { addNameObject } from 'utils/agent-map/addNameObject';

export const modifiedObject = (
  object: FabricCanvasAgentObject,
  objects: FabricAgentMapOtherObject[],
  canvas: fabric.Canvas
): FabricAgentMapOtherObject[] => {
  const newObjectsArr = [...objects];

  if (object) {
    const idxTarget = findIndex(newObjectsArr, { id: object.id });
    const left = object.left;
    const top = object.top;
    const width = Math.round(object.width * object.scaleX);
    const height = Math.round(object.height * object.scaleY);
    const angle = Math.round(object.angle / 10) * 10;
    object.set({
      width,
      height,
      scaleY: 1,
      scaleX: 1,
      angle
    });

    if (idxTarget !== -1) {
      if (newObjectsArr[idxTarget].name && canvas) {
        const name = findNameOfObject(object, canvas);
        if (!name) {
          addNameObject(object, canvas, newObjectsArr[idxTarget].name);
        }
      }
      newObjectsArr[idxTarget] = {
        ...newObjectsArr[idxTarget],
        left,
        top,
        width,
        height,
        angle
      };
    }
    canvas.requestRenderAll();
  }
  return newObjectsArr;
};
