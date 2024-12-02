import { FindAllDto } from '../common';

export type FindAllServiceTypeDto = FindAllDto & {
  parentId?: number;
  isActive?: boolean;
  /** Loại dịch vụ cần tìm */
  serviceTypeId?: number[];
  minLevel?: number;
};
