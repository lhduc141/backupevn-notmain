import { CreateAgentMapOtherObjectDto } from './create-agent-map-other-object.dto';
import { CreateAgentMapSeatDto } from './create-agent-map-seat.dto';

export type CreateAgentMapDto = {
  /** Tên của Agent Map */
  name: string;

  /** Danh sách chỗ ngồi */
  seats: CreateAgentMapSeatDto[];

  /** Danh sách các đối tượng khác */
  otherObjects?: CreateAgentMapOtherObjectDto[];

  /** Trạng thái của Agent Map (hoạt động hoặc không) */
  isActive?: boolean;
};
