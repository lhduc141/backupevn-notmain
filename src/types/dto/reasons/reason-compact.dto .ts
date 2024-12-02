import { ReasonDto } from './reason.dto';

export type ReasonCompactDto = Pick<ReasonDto, 'reasonId' | 'code' | 'content'>;
