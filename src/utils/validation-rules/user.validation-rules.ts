import { Rule } from 'antd/es/form';
import { UserFormType } from 'components';
import { usersMessages } from 'messages';
import { PASSWORD_REG_EXP, PHONE_NUMBER_REG_EXP } from 'utils/constants';

export const userValidationRules: Partial<Record<keyof UserFormType, Rule[]>> = {
  fullName: [{ required: true }],
  shortName: [{ required: true }],
  genderId: [{ required: true }],
  username: [{ required: true }],
  password: [{ required: true }, { pattern: PASSWORD_REG_EXP, message: usersMessages.passwordMismatchPatern }],
  email: [{ type: 'email' }, { required: true }],
  organizationUnitId: [{ required: true }],
  employeeId: [{ required: true }],
  phoneNumber: [{ pattern: PHONE_NUMBER_REG_EXP }]
};

export const userUpdateValidationRules: Partial<Record<keyof UserFormType, Rule[]>> = {
  ...userValidationRules,
  password: [{ pattern: PASSWORD_REG_EXP }]
};
