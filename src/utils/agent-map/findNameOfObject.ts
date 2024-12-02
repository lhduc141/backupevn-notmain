import { FabricCanvasAgentObject } from 'types/fabric-agent-map';
import * as fabric from 'fabric';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';

export const findNameOfObject = (
  canvasOtherObject: FabricCanvasAgentObject,
  canvas: fabric.Canvas
):
  | (fabric.Textbox & {
      id?: string | number;
      objectTypeId?: AGENT_MAP_OBJECT_TYPE;
    })
  | undefined => {
  const objectsArr = canvas.getObjects().filter((o) => o.type === 'textbox');

  if (objectsArr) {
    const input = objectsArr?.find((o) => {
      const object = o as FabricCanvasAgentObject;
      return o.type === 'textbox' && object?.id === canvasOtherObject?.id;
    }) as fabric.Textbox;
    return input;
  }
  return undefined;
};
