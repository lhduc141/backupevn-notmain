import { Rule } from 'antd/es/form';
import { WorkingScheduleFormType } from 'components/working-schedules/WorkingScheduleForm';

export const workingSchedulesValidationRules: Record<keyof WorkingScheduleFormType, Rule[]> = {
  applyDate: [{ required: true }],
  description: [],
  workingScheduleTypeId: [{ required: true }]
};
