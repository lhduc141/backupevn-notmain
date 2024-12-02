import { CUSTOMER_SUPPORT_INFORMATION_FORMAT } from 'utils';
import { FindAllDto } from '../common';

export type FindAllCustomerSupportInformationDto = FindAllDto & {
  formatId?: CUSTOMER_SUPPORT_INFORMATION_FORMAT[];
  isNew?: boolean;
  isActive?: boolean;
};
