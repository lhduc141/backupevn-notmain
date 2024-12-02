import { AgentMapSeatDto } from 'types';
import { FabricAgentMapSeat } from 'types/fabric-agent-map';

export const transformToFabricAgentMapSeat = (data: AgentMapSeatDto[]): FabricAgentMapSeat[] => {
  return data.map((o) => ({
    height: o.height,
    id: o.agentMapSeatId,
    left: o.left,
    seatIp: o.seatIp,
    seatName: o.seatName,
    top: o.top,
    width: o.width
  }));
};
