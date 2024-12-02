import { AgentMapOtherObjectDto } from 'types';
import { FabricAgentMapOtherObject } from 'types/fabric-agent-map';

export const transformToFabricAgentMapOtherObject = (data: AgentMapOtherObjectDto[]): FabricAgentMapOtherObject[] => {
  return data.map((o) => ({
    height: o.height,
    id: o.agentMapOtherObjectId,
    left: o.left,
    top: o.top,
    width: o.width,
    objectTypeId: o.objectTypeId,
    angle: o.angle,
    name: o.name
  }));
};
