import { CreateAgentMapSeatDto } from './create-agent-map-seat.dto';

export type UpdateAgentMapSeatDto = Partial<CreateAgentMapSeatDto> & {
  agentMapSeatId?: number;
};
