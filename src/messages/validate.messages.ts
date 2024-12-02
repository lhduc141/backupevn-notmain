import { FormProps } from 'antd';

export const rulesMessages = {
  noWhitespace: 'Không được có khoảng trắng',
  noVietnameseCharacters: 'Không được sử dụng dấu tiếng Việt',
  passwordsNotMatch: 'Mật khẩu và Nhập lại mật khẩu chưa trùng khớp. Vui lòng nhập lại'
};
export const validateMessages: FormProps['validateMessages'] = {
  /* eslint-disable no-template-curly-in-string */
  required: 'Vui lòng nhập ${label}',
  string: {
    max: '${label} không được quá ${max} ký tự'
  },
  number: {
    min: '${label} phải tối thiểu ${min}'
  },
  types: {
    email: '${label} không đúng định dạng',
    url: '${label} không đúng định dạng'
  },
  pattern: {
    mismatch: '${label} không đúng định dạng'
  }
  /* eslint-enable no-template-curly-in-string */
};
