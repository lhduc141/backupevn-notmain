import { FindAllDto } from '../common';

export type FindAllFrequentlyAskedQuestionDto = FindAllDto & {
  serviceTypeId?: number[];
  isActive?: boolean;
};
