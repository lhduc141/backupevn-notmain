import { AUTH_OPTION_TYPES, CORE_OPTION_TYPES, MICROSERVICES } from 'utils';

export type FindAllOptionsDefaultDto = {
  optionTypeId: AUTH_OPTION_TYPES | CORE_OPTION_TYPES;
  service: MICROSERVICES;
};
