import { ResponsePagingDto } from '../common';
import { MessageDto } from './message.dto';

export type GetMessageResponseDto = ResponsePagingDto<MessageDto> & {
  newMess?: MessageDto[];
};
