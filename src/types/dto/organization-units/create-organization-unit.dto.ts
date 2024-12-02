export type CreateOrganizationUnitDto = {
  code: string;
  name: string;
  shortName?: string;
  description?: string;
  parentId?: number;
  serviceTypeIds: number[];
  organizationUnitClassifyId: number;
  headUserId?: number;
  deputyUserIds?: number[];
};
