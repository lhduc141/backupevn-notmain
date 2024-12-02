import { CustomerDto } from './customer.dto';

export type CustomerCompactDto = Pick<CustomerDto, 'customerId' | 'customerCode' | 'customerName'>;
