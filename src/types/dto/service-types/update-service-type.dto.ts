import { CreateServiceTypeDto } from './create-service-type.dto';

export type UpdateServiceTypeDto = Partial<CreateServiceTypeDto> & {
  serviceTypeId: number;
};
