import { CreateCustomerSupportInformationDto } from './create-customer-support-information.dto';

export type UpdateCustomerSupportInformationDto = Partial<CreateCustomerSupportInformationDto> & {
  customerSupportInformationId: number;
};
