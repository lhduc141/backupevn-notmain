import { ServiceTypeFormType } from 'components/service-types/ServiceTypeForm';
import { SERVICE_TYPES_FORM_OPTIONS } from 'utils/constants';
export const createServiceTypeInitialValues: Partial<ServiceTypeFormType> = {
  formKeyArr: SERVICE_TYPES_FORM_OPTIONS.flatMap((group) =>
    group.options
      /** Lọc những option có checked: true */
      .filter((option) => option.checked)
      /** Lấy giá trị value của option */
      .map((option) => option.value)
  ),
  priority: 1,
  isActive: true
};
