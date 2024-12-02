export type OptionDto = {
  optionId: number;
  optionTypeId: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date; // Assuming this is an ISO date  ($date-time)
  updatedAt: Date; // Assuming this is an ISO date  ($date-time)
};
export type OptionCompactDto = Pick<OptionDto, 'optionId' | 'code' | 'name'>;
