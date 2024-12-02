import { Rule } from 'antd/es/form';
import { FrequentlyAskedQuestionFormType } from 'components/frequently-asked-questions/FrequentlyAskedQuestionForm';

export const frequentlyAskedQuestionsValidationRules: Record<keyof FrequentlyAskedQuestionFormType, Rule[]> = {
  content: [{ required: true }],
  isActive: [],
  keyword: [{ required: true }],
  serviceTypeId: [],
  priority: [],
  title: [{ required: true }]
};
