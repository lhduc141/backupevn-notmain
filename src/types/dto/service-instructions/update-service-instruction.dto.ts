export type UpdateServiceInstructionDto = {
  /** Hướng dẫn chung */
  general?: string;

  /** Chi tiết */
  detail?: string;

  /** Hồ sơ */
  profile?: string;

  /** Mã dịch vụ */
  serviceTypeId: number;
};
