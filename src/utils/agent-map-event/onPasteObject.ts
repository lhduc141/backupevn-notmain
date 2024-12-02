import { FabricAgentMapOtherObject, FabricAgentMapSeat, FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { agentMapOtherObjectsTypes } from 'utils/constants';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';

export const onPasteObject = (
  e: KeyboardEvent,
  clipboard: FabricCanvasAgentObject | null,
  setClipboard: (value: FabricCanvasAgentObject | null) => void,
  handleAddSeat: (seat?: Partial<FabricAgentMapSeat>) => void,
  handleAddObject: (otherObject: Partial<FabricAgentMapOtherObject>) => void
) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.keyCode === 86)) {
    if (!clipboard) return;
    e.preventDefault();

    clipboard.clone().then((clonedObj) => {
      if (clonedObj) {
        setClipboard(null);
        if (clipboard.objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT) {
          handleAddSeat();
          return;
        }
        if (clipboard.objectTypeId && agentMapOtherObjectsTypes.includes(clipboard.objectTypeId)) {
          handleAddObject({
            objectTypeId: clipboard.objectTypeId,
            width: clonedObj.width,
            height: clonedObj.height,
            angle: clonedObj.angle
          });
        }
      }
    });
  }
};
