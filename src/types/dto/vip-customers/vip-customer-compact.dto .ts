import { VipCustomerDto } from './vip-customer.dto';

export type VipCustomerCompactDto = Pick<VipCustomerDto, 'vipCustomerId' | 'code' | 'name' | 'color'>;
