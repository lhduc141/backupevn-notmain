import { Form, FormInstance } from 'antd';
import { Editor } from 'components';
import { customerSupportInformationMessages } from 'messages/customer-support-information.messages';
import { CreateCustomerSupportInformationDto } from 'types';
import { customerSupportInformationValidationRules } from 'utils';
import { CustomerSupportInformationFormType } from './CustomerSupportInformationForm';

type CustomerSupportInformationContentFormatTextProps = {
  form: FormInstance<CustomerSupportInformationFormType>;
  initialValue: string;
};

const CustomerSupportInformationContentFormatText = ({ form }: CustomerSupportInformationContentFormatTextProps) => {
  const content = Form.useWatch('content', form) || '';
  return (
    <>
      <Editor
        value={content}
        onEditorChange={(a) => {
          form.setFieldValue('content', a);
        }}
        init={{
          content_style: 'body { background-color: #F7F8F9; }'
        }}
      />
      <Form.Item<CreateCustomerSupportInformationDto>
        label={customerSupportInformationMessages.content}
        name='content'
        rules={customerSupportInformationValidationRules.content}
        className='hide-label'
      ></Form.Item>
    </>
  );
};
export default CustomerSupportInformationContentFormatText;
