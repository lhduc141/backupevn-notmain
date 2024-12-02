import { findIndex } from 'lodash';
import { FabricAgentMapSeat, FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const modifiedSeat = (object: FabricCanvasAgentObject, objects: FabricAgentMapSeat[]): FabricAgentMapSeat[] => {
  const newSeat = [...objects];
  const idxTarget = findIndex(newSeat, { id: object.id });

  if (object) {
    const left = object.left;
    const top = object.top;
    const width = object.width;
    const height = object.height;

    if (idxTarget !== -1) {
      newSeat[idxTarget] = {
        ...newSeat[idxTarget],
        left,
        top,
        width,
        height
      };
    }
  }
  return newSeat;
};
