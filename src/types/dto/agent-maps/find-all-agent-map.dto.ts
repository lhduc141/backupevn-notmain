import { FindAllDto } from '../common';

export type FindAllAgentMapDto = FindAllDto & {
  isActive?: boolean;
};
