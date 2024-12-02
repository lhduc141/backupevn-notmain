import { Rule } from 'antd/es/form';
import { CreateGroupConversationDto } from 'types';

export const internalChatValidationRules: Record<keyof CreateGroupConversationDto, Rule[]> = {
  name: [{ required: true, max: 255 }],
  participants: [{ required: true }],
  image: []
};
