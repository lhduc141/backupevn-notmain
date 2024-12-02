import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { findNameOfObject } from 'utils/agent-map/findNameOfObject';

export const onKeydownMoveObject = (e: KeyboardEvent, canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject() as FabricCanvasAgentObject;
  const nameObject = findNameOfObject(activeObject, canvas);

  if (!activeObject) return;

  const moveObject = (dx: number, dy: number) => {
    activeObject.left += dx;
    activeObject.top += dy;
    activeObject.setCoords();
    canvas.fire('object:modified', { target: activeObject });
    if (nameObject) {
      nameObject.left += dx;
      nameObject.top += dy;
      nameObject?.setCoords();
    }

    canvas.renderAll();
  };

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      moveObject(0, -10);
      break;
    case 'ArrowDown':
      e.preventDefault();
      moveObject(0, 10);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      moveObject(-10, 0);
      break;
    case 'ArrowRight':
      e.preventDefault();
      moveObject(10, 0);
      break;
    default:
      return;
  }
};
