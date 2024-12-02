import { CreateFrequentlyAskedQuestionDto } from './create-frequently-asked-question.dto';

export type UpdateFrequentlyAskedQuestionDto = Partial<CreateFrequentlyAskedQuestionDto> & {
  frequentlyAskedQuestionId: number;
};
