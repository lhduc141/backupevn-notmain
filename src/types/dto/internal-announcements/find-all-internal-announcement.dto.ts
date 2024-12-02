import { FindAllDto } from '../common';

export type FindAllInternalAnnouncementDto = FindAllDto & {
  organizationUnitId?: number;
  isRequestConfirm?: boolean;
  statusId?: number;
};
