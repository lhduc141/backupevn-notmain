import { CreateAgentMapSeatDto } from 'types/dto';
import { AGENT_MAP_OBJECT_TYPE } from 'utils';
export type FabricAgentMapSeat = CreateAgentMapSeatDto & {
  id: string | number;
  objectTypeId?: AGENT_MAP_OBJECT_TYPE;
  error?: boolean;
};
