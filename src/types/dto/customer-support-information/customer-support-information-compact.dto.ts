import { CustomerSupportInformationDto } from './customer-support-information.dto';

export type CustomerSupportInformationCompactDto = Pick<
  CustomerSupportInformationDto,
  'customerSupportInformationId' | 'title' | 'icon'
>;
