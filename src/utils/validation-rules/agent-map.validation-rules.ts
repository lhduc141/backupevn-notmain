import { Rule } from 'antd/es/form';
import { AgentMapFormType } from 'pages/AgentMap';

export const agentMapsValidationRules: Record<keyof AgentMapFormType, Rule[]> = {
  name: [{ required: true }],
  otherObjects: [],
  seats: [{ required: true }],
  isActive: [],
  fabricSeats: [{ required: true }],
  fabricOtherObjects: [{ required: true }]
};
