import { Rule } from 'antd/es/form';
import { InternalChatGroupFormCreateType } from 'components/internal-chat/InternalChatGroupFormCreate';

export const createInternalChatGroupValidationRules: Record<keyof InternalChatGroupFormCreateType, Rule[]> = {
  name: [{ required: true, max: 255 }],
  participants: [{ required: true }],
  image: []
};
