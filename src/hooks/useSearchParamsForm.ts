import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
type InputObject = {
  [key: string]: any;
};

export function useSearchParamsForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const transformValue = (value: string, key?: string): any => {
    /** Kiểm tra nếu key kết thúc bằng 'Arr' là chuỗi */
    if (key?.endsWith('Arr')) {
      /**  Tách value thành mảng dựa trên dấu phẩy và áp dụng transformValue cho từng phần tử*/
      return value.split(',').map((val: string) => transformValue(val));
    }

    /**  Kiểm tra nếu value có thể chuyển đổi thành số */
    if (value.length > 0 && !Number.isNaN(Number(value))) {
      return Number(value);
    }

    /**  Trả về value dưới dạng chuỗi */
    return value;
  };
  const transformKeys = (inputObj: InputObject) => {
    return Object.fromEntries(
      Object.entries(inputObj).map(([key, value]) => [
        /** Loại bỏ 'Arr' nếu có */
        key.endsWith('Arr') ? key.slice(0, -3) : key,
        transformValue(value, key)
      ])
    );
  };
  const getSearchParams = useCallback(() => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    return transformKeys(paramsObject);
  }, [searchParams]);

  const createSearchParamsString = (values: InputObject) => {
    let filterData = { ...values };
    Object.keys(filterData).forEach((key) => {
      if (filterData[key] === undefined || (Array.isArray(filterData[key]) && filterData[key].length === 0)) {
        delete filterData[key];
      }
      if (Array.isArray(filterData[key])) {
        filterData = {
          ...filterData,
          /** Thêm Arr để nhận biết là chuỗi */
          [`${key}Arr`]: filterData[key]
        };
        delete filterData[key];
      }
    });
    return new URLSearchParams(filterData).toString();
  };
  const setParams = (values: InputObject) => {
    const searchTerm = createSearchParamsString(values);

    navigate({
      pathname: window.location.pathname,
      search: `?${searchTerm}`
    });
  };

  const setParam = (key: string, value: any) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return {
    createSearchParamsString,
    getSearchParams,
    setSearchParams: setParams,
    setSearchParam: setParam
  };
}
