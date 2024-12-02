import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { findNameOfObject } from 'utils/agent-map';
import { agentMapOtherObjectsTypes } from 'utils/constants';

export const onCanvasMouseDown = (
  e: fabric.TPointerEventInfo<fabric.TPointerEvent>,
  canvas: fabric.Canvas,
  activeCanvasObj: React.MutableRefObject<
    | FabricCanvasAgentObject
    | fabric.Textbox<Partial<fabric.TextboxProps>, fabric.SerializedTextboxProps, fabric.ITextEvents>
    | undefined
  >
) => {
  if (!e.target) return;
  const target = e.target as FabricCanvasAgentObject;
  if (target?.objectTypeId && agentMapOtherObjectsTypes.includes(target.objectTypeId) && canvas) {
    const nameObject = findNameOfObject(target, canvas);
    activeCanvasObj.current = nameObject;
  }
};
