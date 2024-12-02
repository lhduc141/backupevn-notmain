import FormItemErrorText from './FormItemErrorText';
import FormItemFloatLabel from './FormItemFloatLabel';
import FormItemCustom from './FormItem';

export type FormItemProps = typeof FormItemCustom & {
  FloatLabel: typeof FormItemFloatLabel;
  ErrorText: typeof FormItemErrorText;
};

const FormItem = FormItemCustom as FormItemProps;
FormItem.FloatLabel = FormItemFloatLabel;
FormItem.ErrorText = FormItemErrorText;
export { FormItem };
