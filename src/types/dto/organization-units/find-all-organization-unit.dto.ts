import { FindAllDto } from '../common';

export type FindAllOrganizationUnitDto = FindAllDto & {
  parentId?: number[];
  /** ID đơn vị / phòng đội cần tìm */
  organizationUnitId?: number[];

  serviceTypeId?: number[];

  organizationUnitClassifyId?: number[];
};
