import { ServiceTypeDto } from './service-type.dto';

export type ServiceTypeCompactDto = Pick<ServiceTypeDto, 'serviceTypeId' | 'code' | 'name'> & {
  childrenCompact?: ServiceTypeCompactDto[];
};
