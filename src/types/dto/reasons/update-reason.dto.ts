import { CreateReasonDto } from './create-reason.dto';

export type UpdateReasonDto = Partial<CreateReasonDto> & {
  reasonId: number;
};
