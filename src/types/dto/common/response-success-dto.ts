import { HTTP_STATUS } from 'utils';

export type ResponseDto<T> = {
  statusCode: HTTP_STATUS;
  message: string;
  data: T;
  errors: string[];
};
