import { CreateAgentMapDto } from './create-agent-map.dto';
import { UpdateAgentMapOtherObjectDto } from './update-agent-map-other-object.dto';
import { UpdateAgentMapSeatDto } from './update-agent-map-seat.dto';

export type UpdateAgentMapDto = Partial<Omit<CreateAgentMapDto, 'seats' | 'otherObjects'>> & {
  agentMapId: number;

  /** Danh sách chỗ ngồi */
  seats?: UpdateAgentMapSeatDto[];

  /** Danh sách các đối tượng khác */
  otherObjects?: UpdateAgentMapOtherObjectDto[];
};
