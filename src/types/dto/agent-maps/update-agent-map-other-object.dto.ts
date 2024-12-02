import { CreateAgentMapOtherObjectDto } from './create-agent-map-other-object.dto';

export type UpdateAgentMapOtherObjectDto = Partial<CreateAgentMapOtherObjectDto> & {
  agentMapOtherObjectId?: number;
};
