import { CONVERSATION_TYPE } from 'utils';
import { FindAllDto } from '../common';

export type FindAllConversationDto = {
  skip: number;
  limit: number;
  keyword?: string;
  type?: CONVERSATION_TYPE;
};
