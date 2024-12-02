import { FrequentlyAskedQuestionFormType } from 'components/frequently-asked-questions/FrequentlyAskedQuestionForm';
import { ITEM_SELECT_ALL } from 'utils/constants';

export const createFrequentlyAskedQuestionInitialValues: Partial<FrequentlyAskedQuestionFormType> = {
  serviceTypeId: ITEM_SELECT_ALL
};
