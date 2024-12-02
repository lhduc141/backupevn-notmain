import { CreateInternalAnnouncementDto } from './create-internal-announcement.dto';

export type UpdateInternalAnnouncementDto = Partial<CreateInternalAnnouncementDto> & {
  internalAnnouncementId: number;
  statusId?: number;
};
