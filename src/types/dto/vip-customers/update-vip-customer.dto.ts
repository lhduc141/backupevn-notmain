import { CreateVipCustomerDto } from './create-vip-customer.dto';

export type UpdateVipCustomerDto = Partial<CreateVipCustomerDto> & {
  vipCustomerId: number;
};
