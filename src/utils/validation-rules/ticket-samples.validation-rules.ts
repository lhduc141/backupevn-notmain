import { Rule } from 'antd/es/form';
import { TicketSampleFormType } from 'components/ticket-samples/TicketSampleForm';
import { rulesMessages } from 'messages';

export const ticketSamplesValidationRules: Record<keyof TicketSampleFormType, Rule[]> = {
  content: [{ required: true }],
  hotkey: [
    {
      max: 10
    },
    {
      pattern: /^\S*$/,
      message: rulesMessages.noWhitespace
    },
    {
      pattern: /^[^\u00C0-\u017F]*$/,
      message: rulesMessages.noVietnameseCharacters
    }
  ],
  isActive: [],
  serviceTypeId: [{ required: true }],
  summary: [],
  title: [{ required: true }, { max: 10 }]
};
