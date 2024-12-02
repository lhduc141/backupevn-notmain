import { AgentMapOtherObjectDto } from './agent-map-other-object.dto';
import { AgentMapSeatDto } from './agent-map-seat.dto';

export type AgentMapDto = {
  /** ID của Agent Map */
  agentMapId: number;

  /** Tên của Agent Map */
  name: string;

  /** Trạng thái của Agent Map (hoạt động hoặc không) */
  isActive: boolean;

  /** Thời gian tạo Agent Map */
  createdAt: string;

  /** Thời gian cập nhật Agent Map */
  updatedAt?: string;

  /** Thời gian xóa Agent Map */
  deletedAt?: string;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Chỗ ngồi */
  seats?: AgentMapSeatDto[];

  /** Đối tượng khác */
  otherObjects?: AgentMapOtherObjectDto[];

  /** Số chỗ ngồi */
  countSeats?: number;

  /** Số cửa */
  countDoors?: number;
};
