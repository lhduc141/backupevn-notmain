import { Rule } from 'antd/es/form';
import { TicketCancelReasonFormType } from 'components/ticket-cancel-reasons/TicketCancelReasonForm';

export const ticketCancelReasonsValidationRules: Record<keyof TicketCancelReasonFormType, Rule[]> = {
  content: [{ required: true }],
  isActive: [],
  serviceTypeIds: [{ required: true }]
};
