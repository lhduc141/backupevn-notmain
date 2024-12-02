import { FormInstance, UploadFile } from 'antd';
import { FormItem, UploadExcel } from 'components';
import { UploadExcelDataType } from 'components/common/excel/UploadExcel';
import { CreateCustomerSupportInformationDto } from 'types';
import { customerSupportInformationValidationRules } from 'utils';
import { CustomerSupportInformationFormType } from './CustomerSupportInformationForm';
type Props = {
  contentContainer?: HTMLDivElement | null;
  form: FormInstance<CustomerSupportInformationFormType>;
};
const CustomerSupportInformationContentFormatTable = ({ form, contentContainer }: Props) => {
  const normFileExcel = ({ file }: { file: UploadFile<UploadExcelDataType> }) => {
    if (file.percent === 100 && file.response) return JSON.stringify(file.response?.excelData);
    return file;
  };

  return (
    <>
      <FormItem<CreateCustomerSupportInformationDto>
        valuePropName='fileList'
        name='content'
        getValueFromEvent={normFileExcel}
        rules={customerSupportInformationValidationRules.content}
      >
        <UploadExcel
          excelProps={{
            minWidth: 720,
            height: window.innerHeight - 160,
            maxWidth: contentContainer?.offsetWidth ? contentContainer?.offsetWidth - 48 : 1060
          }}
          onRemove={() => form.setFieldValue('content', undefined)}
        />
      </FormItem>
    </>
  );
};
export default CustomerSupportInformationContentFormatTable;
