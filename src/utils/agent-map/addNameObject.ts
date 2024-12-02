import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const addNameObject = (
  object: FabricCanvasAgentObject | (fabric.Rect & { id: string | number }),
  canvas: fabric.Canvas,
  name?: string
) => {
  const { left, top, width, id, angle, height } = object;

  const radian = (angle * Math.PI) / 180;
  const leftText = left - height * Math.sin(radian);
  const topText = top + height * Math.cos(radian);

  const input = new fabric.Textbox(name ?? '', {
    left: leftText,
    top: topText,
    angle,
    width: width,
    fontSize: 16,
    editable: true,
    textAlign: 'center',
    fontFamily: 'inter',
    fill: 'black',
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
    selectable: false
  });
  input.set({
    id
  });

  canvas.add(input);
  return input;
};
