import { FindAllDto } from '../common';

export type FindAllServiceInstructionsDto = FindAllDto & {
  parentId?: number;
  isActive?: boolean;
};
