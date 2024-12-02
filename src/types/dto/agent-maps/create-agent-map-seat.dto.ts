export type CreateAgentMapSeatDto = {
  /** IP của chỗ ngồi */
  seatIp: string;

  seatName: string;

  /** Chiều rộng của chỗ ngồi */
  width: number;

  /** Chiều cao của chỗ ngồi */
  height: number;

  /** Vị trí từ trái của chỗ ngồi */
  left: number;

  /** Vị trí từ trên của chỗ ngồi */
  top: number;
};
