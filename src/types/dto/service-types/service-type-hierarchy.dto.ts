import { ServiceTypeDto } from './service-type.dto';

export type ServiceTypeHierarchyDto = ServiceTypeDto & {
  children: ServiceTypeHierarchyDto[];
};
