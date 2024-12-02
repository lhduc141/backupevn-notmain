import * as fabric from 'fabric';
import { findIndex } from 'lodash';
import { FabricCanvasAgentObject, FabricAgentMapOtherObject } from 'types/fabric-agent-map';
import { findNameOfObject } from './findNameOfObject';
import { addNameObject } from './addNameObject';

export const onDoubleClickOtherObject = (
  canvasOtherObject: FabricCanvasAgentObject,
  otherObjects: FabricAgentMapOtherObject[],
  canvas: fabric.Canvas,
  onChangeNameOtherObject: (data: FabricAgentMapOtherObject[]) => void
) => {
  const input = findNameOfObject(canvasOtherObject, canvas);
  if (canvas) {
    let text = '';
    if (input) {
      text = input.text;
      canvas.remove(input);
    }
    const newInput = addNameObject(canvasOtherObject, canvas, text);
    newInput.selectAll();
    newInput.enterEditing();
    canvas?.setActiveObject(newInput);
    canvas?.bringObjectForward(newInput);

    newInput.on('editing:exited', () => {
      const newOtherObjects = [...otherObjects];
      const idxTarget = findIndex(newOtherObjects, { id: canvasOtherObject.id });
      if (idxTarget !== -1) {
        newOtherObjects[idxTarget] = {
          ...newOtherObjects[idxTarget],
          name: newInput.text
        };

        onChangeNameOtherObject(newOtherObjects);
      }
    });
  }
};
