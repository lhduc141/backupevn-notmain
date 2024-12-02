import { Input } from 'antd';
import { FormItem } from 'components';
import { customerSupportInformationMessages } from 'messages/customer-support-information.messages';
import { CreateCustomerSupportInformationDto } from 'types';
import { customerSupportInformationValidationRules } from 'utils';

const CustomerSupportInformationContentFormatLink = () => {
  return (
    <FormItem<CreateCustomerSupportInformationDto>
      name='content'
      label={customerSupportInformationMessages.content}
      hiddenLabel
      rules={[
        ...customerSupportInformationValidationRules.content,
        {
          type: 'url'
        }
      ]}
    >
      <Input className='h-12 border-none bg-colorBgSmallModal' placeholder='https://' />
    </FormItem>
  );
};
export default CustomerSupportInformationContentFormatLink;
