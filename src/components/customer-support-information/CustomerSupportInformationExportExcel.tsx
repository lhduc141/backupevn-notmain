import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FormItem } from 'components/common';
import { messages } from 'messages';
import { memo } from 'react';
import { CreateCustomerSupportInformationDto } from 'types';
import { createExcelBuffer, fileDownload, isValidJson } from 'utils';

function CustomerSupportInformationExportExcel() {
  function exportExcel(title: string, content: string) {
    const rows = JSON.parse(content);
    const buffer = createExcelBuffer(rows);
    fileDownload(buffer, `${title}.xlsx`);
  }

  return (
    <FormItem<CreateCustomerSupportInformationDto> noStyle dependencies={['content']}>
      {({ getFieldValue }) => {
        const title = getFieldValue('title');
        const content = getFieldValue('content');

        return (
          content &&
          isValidJson(content) && (
            <Button className='float-right' icon={<DownloadOutlined />} onClick={() => exportExcel(title, content)}>
              {messages.exportExcel}
            </Button>
          )
        );
      }}
    </FormItem>
  );
}

export default memo(CustomerSupportInformationExportExcel);
