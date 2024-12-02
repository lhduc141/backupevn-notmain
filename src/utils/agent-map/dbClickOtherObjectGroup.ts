import * as fabric from 'fabric';
import { findIndex } from 'lodash';
import { colorsBase } from 'themes';
import { FabricCanvasAgentObject, FabricAgentMapOtherObject } from 'types/fabric-agent-map';

export const onDoubleClickOtherObject = (
  canvasOtherObject: FabricCanvasAgentObject,
  otherObjects: FabricAgentMapOtherObject[],
  canvas: fabric.Canvas,
  onChangeNameOtherObject: (data: FabricAgentMapOtherObject[]) => void
) => {
  const objectsSeat = canvasOtherObject.getObjects();
  const input = objectsSeat.find((o) => o.type === 'textbox') as fabric.Textbox;

  if (input && canvas) {
    const { text, width } = input;
    const { left: leftGroup, top: topGroup } = canvasOtherObject;
    const leftNew = leftGroup;
    const topNew = topGroup;

    const newInput = new fabric.Textbox(text, {
      left: leftNew,
      top: topNew,
      width,
      fontSize: 14,
      editable: true,
      textAlign: 'left',
      fill: colorsBase.colorTextBase,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      selectable: false
    });
    canvas?.add(newInput);
    canvasOtherObject.remove(input);

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

      canvas?.remove(newInput);
      canvasOtherObject.add(newInput);
      canvas.renderAll();
    });

    canvas.renderAll();
  }
};
