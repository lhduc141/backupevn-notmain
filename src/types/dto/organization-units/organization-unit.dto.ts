import { OptionCompactDto, OrganizationUnitCompactDto, ServiceTypeCompactDto, UserCompactDto } from 'types';

export type OrganizationUnitDto = {
  organizationUnitId: number;
  code: string;
  name: string;
  shortName?: string;
  description?: string;
  isSystem: boolean;
  level: number;
  parentId?: number;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  parent?: OrganizationUnitCompactDto;
  serviceTypes: ServiceTypeCompactDto[];
  organizationUnitClassifyId: number;
  organizationUnitClassify?: OptionCompactDto;
  headUser?: UserCompactDto;
  deputyUsers?: UserCompactDto[];
  countServiceTypes?: number;
  countUsers?: number;
};
