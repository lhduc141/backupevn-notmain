import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const movingObject = (object: FabricCanvasAgentObject, canvas: fabric.Canvas) => {
  if (canvas) {
    if (object.left < 0) {
      object.left = 0;
    }
    if (object.top < 0) {
      object.top = 0;
    }
    if (object.left + object.width * object.scaleX > canvas.width) {
      object.left = canvas.width - object.width * object.scaleX;
    }
    if (object.top + object.height * object.scaleY > canvas.height) {
      object.top = canvas.height - object.height * object.scaleY;
    }
  }
};
