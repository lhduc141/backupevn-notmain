import { FindWithKeywordDto } from '../common';

export type FindOrganizationUnitHierarchyDto = FindWithKeywordDto & {
  parentId?: number[];
  /** ID đơn vị / phòng đội cần tìm */
  organizationUnitId?: number[];

  organizationUnitClassifyId?: number[];

  serviceTypeId?: number[];
};
