import * as fabric from 'fabric';
import { FabricAgentMapOtherObject, FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { onDoubleClickOtherObject } from 'utils/agent-map';
import { agentMapOtherObjectsTypes } from 'utils/constants';

export const onCanvasDbClick = (
  e: fabric.TPointerEventInfo<fabric.TPointerEvent>,
  canvas: fabric.Canvas,
  objectArr: React.MutableRefObject<FabricAgentMapOtherObject[]>
) => {
  if (!e.target) return;
  const target = e.target as FabricCanvasAgentObject;
  if (target.objectTypeId && agentMapOtherObjectsTypes.includes(target.objectTypeId)) {
    onDoubleClickOtherObject(target, objectArr.current, canvas, (data) => {
      objectArr.current = data;
    });
  }
};
