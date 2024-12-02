import * as fabric from 'fabric';
import { FabricAgentMapOtherObject, FabricAgentMapSeat, FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { modifiedObject } from 'utils/agent-map';
import { modifiedSeat } from 'utils/agent-map/modifiedSeat';
import { agentMapOtherObjectsTypes } from 'utils/constants';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
type Props = {
  e: fabric.ModifiedEvent<fabric.TPointerEvent>;
  canvas: fabric.Canvas;
  objectArr: React.MutableRefObject<FabricAgentMapOtherObject[]>;
  onOtherObjectsChange?: (values: FabricAgentMapOtherObject[]) => void;
  seatsArr: React.MutableRefObject<FabricAgentMapSeat[]>;
  onSeatChange?: (values: FabricAgentMapSeat[]) => void;
};
export const onCanvasObjectModified = ({
  e,
  canvas,
  objectArr,
  onOtherObjectsChange,
  seatsArr,
  onSeatChange
}: Props) => {
  if (!e.target) return;
  const target = e.target as FabricCanvasAgentObject;
  if (target.objectTypeId && agentMapOtherObjectsTypes.includes(target.objectTypeId) && objectArr.current) {
    objectArr.current = modifiedObject(target, objectArr.current, canvas);
    onOtherObjectsChange?.(objectArr.current);
  } else if (seatsArr.current && target.objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT) {
    seatsArr.current = modifiedSeat(target, seatsArr.current);
    onSeatChange?.(seatsArr.current);
  }
};
