import { FileExcelOutlined, FileImageOutlined, FilePdfOutlined, FileWordOutlined } from '@ant-design/icons';
import { FILE_TYPE } from 'utils/enums';

export const FILE_SYMBOL = [
  {
    value: FILE_TYPE.IMAGE,
    color: '#FF3093',
    icon: <FileImageOutlined />
  },
  {
    value: FILE_TYPE.EXCEL,
    color: '#01AC49',
    icon: <FileExcelOutlined />
  },
  {
    value: FILE_TYPE.PDF,
    color: '#EA3434',
    icon: <FilePdfOutlined />
  },
  {
    value: FILE_TYPE.DOCS,
    color: '#2684FF',
    icon: <FileWordOutlined />
  }
];
