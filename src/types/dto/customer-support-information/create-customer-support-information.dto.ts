import { CUSTOMER_SUPPORT_INFORMATION_FORMAT } from 'utils';

export type CreateCustomerSupportInformationDto = {
  title: string;
  content: string;
  formatId: CUSTOMER_SUPPORT_INFORMATION_FORMAT;
  priority?: number;
  icon?: number;
  isNew?: boolean;
  isActive?: boolean;
};
