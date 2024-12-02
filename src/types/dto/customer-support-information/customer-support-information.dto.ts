import { OptionCompactDto } from '../options';

export type CustomerSupportInformationDto = {
  customerSupportInformationId: number;
  title: string;
  content: string;
  formatId: number;
  format: OptionCompactDto;
  priority: number;
  icon?: number;
  isNew: boolean;
  isActive: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
