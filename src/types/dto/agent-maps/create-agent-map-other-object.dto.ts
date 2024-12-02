import { AGENT_MAP_OBJECT_TYPE } from 'utils';

export type CreateAgentMapOtherObjectDto = {
  /** Tên của đối tượng khác */
  name?: string;

  /** ID loại đối tượng */
  objectTypeId: AGENT_MAP_OBJECT_TYPE;

  /** Chiều rộng của đối tượng khác */
  width: number;

  /** Chiều cao của đối tượng khác */
  height: number;

  /** Vị trí từ trái của đối tượng khác */
  left: number;

  /** Vị trí từ trên của đối tượng khác */
  top: number;

  /** Độ nghiên của đối tượng khác */
  angle?: number;
};
