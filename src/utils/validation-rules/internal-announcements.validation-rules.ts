import { Rule } from 'antd/es/form';
import { InternalAnnouncementFormType } from 'components/internal-announcements/InternalAnnouncementForm';

export const internalAnnouncementsValidationRules: Record<keyof InternalAnnouncementFormType, Rule[]> = {
  content: [{ required: true }],
  files: [],
  isRequestConfirm: [],
  organizationUnitIds: [{ required: true }],
  priority: [],
  title: [{ required: true }]
};
