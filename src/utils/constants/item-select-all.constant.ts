import { DefaultOptionType } from 'antd/es/select';
import { messages, serviceTypesMessages } from 'messages';

export const ITEM_SELECT_ALL: DefaultOptionType = {
  label: messages.selectAll,
  value: null
};

export const SERVICE_TYPE_SELECT_ALL: DefaultOptionType = {
  label: serviceTypesMessages.allServiceType,
  value: null
};
